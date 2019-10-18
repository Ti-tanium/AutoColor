from colorthief import ColorThief
import colorsys


def sortByLight2(elem):
    hls = colorsys.rgb_to_hls(*elem)
    return hls[1]


def get_palette(filename, color_count=5):
    color_thief = ColorThief(filename)
    palette = color_thief.get_palette(color_count=color_count, quality=1)

    palette.sort(key=sortByLight2, reverse=True)
    return palette
