import lightgbm as gbm
import colorsys

import numpy
import pandas as pd
from django.conf import settings

MODEL_PATH = settings.CHECK_STYLE_MODEL
EPS = 0.6
gbm = gbm.Booster(model_file=MODEL_PATH)
style = ['cute', 'technology', 'fresh']


# param: palette,eg:[(r,g,b),(r,g,b),(r,g,b),(r,g,b),(r,g,b)]
# return style ['cute','fresh','technology']
# return -1: do not belong to cute, fresh or technology
def style_predict(palettes, target):
    def sortByLight2(elem):
        hls = colorsys.rgb_to_hls(*elem)
        return hls[1]

    target_idx = style.index(target)
    max_p = 0
    max_plt = None
    for _palette in palettes:
        palette = numpy.reshape(_palette, (5, 3))
        palette = [tuple(i) for i in palette]
        # build a color palette
        palette.sort(key=sortByLight2, reverse=True)
        palette1 = [*palette[0], *palette[1], *palette[2], *palette[3], *palette[4]]
        for c in palette:
            h, l, s = colorsys.rgb_to_hls(*c)
            palette1 = [*palette1, h, l, s]
        x = pd.Series(palette1)
        y_pred = gbm.predict(x, num_iteration=gbm.best_iteration)
        assert len(y_pred)==1
        y_pred = y_pred.tolist()[0]
        if y_pred[target_idx] < EPS:
            if y_pred[target_idx] > max_p:
                max_p = y_pred[target_idx]
                max_plt = _palette
            continue

        return _palette

    return max_plt
