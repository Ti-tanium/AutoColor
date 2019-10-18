from django.contrib.auth.models import User
from django.db import models


# 配色方案模型
class Palettes(models.Model):
    palette = models.CharField(max_length=512)


# 发布的配色模型
class PostedPalettes(models.Model):
    likeCount = models.IntegerField()
    collectCount = models.IntegerField()
    paletteId = models.ForeignKey(Palettes, on_delete=models.CASCADE)
    ownerId = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)


# 设计稿
class Designs(models.Model):
    design = models.CharField(max_length=4096)


# 上色的设计稿
class ColoredDesigns(models.Model):
    designId = models.ForeignKey(Designs, on_delete=models.CASCADE)
    paletteId = models.ForeignKey(Palettes, on_delete=models.SET_NULL, blank=True, null=True)


# 发布的设计稿模型
class PostedDesigns(models.Model):
    thumbUrl = models.CharField(max_length=256)  # 用于列表的略缩图
    ownerId = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    coloredDesignId = models.ForeignKey(ColoredDesigns, on_delete=models.CASCADE)  # 注意：是coloredDesign的外键
    like = models.ManyToManyField(User, related_name='likes')
    # share = models.BooleanField()
    # shareUrl = models.CharField(max_length=256)

# # 设计稿模版模型
# class TemplatesCollections(models.Model):
#     templatesId = models.IntegerField()
#     userId = models.IntegerField()
# 
# 
# # 发布的配色模型
# class PostPaletteCollections(models.Model):
#     postPalettesId = models.IntegerField()
#     userId = models.IntegerField()
# 
#     class Meta:
#         db_table = "postPaletteCollections"  # 更改表名
