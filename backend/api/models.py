from django.db import models
from django.contrib.auth.models import User


# 用户信息模型
class Profile(models.Model):
    """
    用户资料类，一对一地关联auth.models.User，后者存储了first_name/last_name/email和认证相关信息
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    nickname = models.CharField(max_length=32, blank=False)
    qq = models.CharField(max_length=20, blank=False)
    weChat = models.CharField(max_length=128, blank=False)
    avatar = models.ImageField(blank=True, verbose_name="图片", upload_to='avatars')
    registerTime = models.DateTimeField(auto_now_add=True, blank=False)
