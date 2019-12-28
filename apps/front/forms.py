from apps.forms import BaseForm
from wtforms import StringField,IntegerField
from wtforms.validators import regexp,InputRequired,EqualTo,ValidationError,Regexp
import hashlib
from utils import zlcache



class SMSCaptchaForm(BaseForm):
    salt = 'q3423805gdflvbdfvhsdoa`#$%'#盐是随便给的
    telephone = StringField(validators=[regexp(r'1[345789]\d{9}')])
    timestamp = StringField(validators=[regexp(r'\d{13}')])
    sign = StringField(validators=[InputRequired()])#Md5值

    def validate(self):
        result = super(SMSCaptchaForm, self).validate()
        if not result:
            return False

        telephone = self.telephone.data
        timestamp = self.timestamp.data
        sign = self.sign.data

        # md5(timestamp+telphone+salt)
        # md5函数必须要传一个bytes类型的字符串进去
        sign2 = hashlib.md5((timestamp + telephone + self.salt).encode('utf-8')).hexdigest()
        print('客户端提交的sign：', sign)
        print('服务器生成的sign：', sign2)
        if sign == sign2:
            return True
        else:
            return False


"""
这上边全是
158讲讲的
下边是161讲
"""
class SignupForm(BaseForm):
    telephone = StringField(validators=[Regexp(r"1[345789]\d{9}",message='请输入正确格式的手机号码！')])
    sms_captcha = StringField(validators=[Regexp(r"\w{4}",message='请输入正确格式的短信验证码！')])
    username = StringField(validators=[Regexp(r".{2,20}",message='请输入正确格式的用户名！')])
    password1 = StringField(validators=[Regexp(r"[0-9a-zA-Z_\.]{6,20}",message='请输入正确格式的密码！')])
    password2 = StringField(validators=[EqualTo("password1",message='两次输入的密码不一致！')])
    graph_captcha = StringField(validators=[Regexp(r"\w{4}",message='请输入正确格式的短信验证码！')])

    def validate_sms_captcha(self,field):
        sms_captcha = field.data
        telephone = self.telephone.data
        #
        # sms_captcha_mem = zlcache.get(telephone)
        # if not sms_captcha_mem or sms_captcha_mem.lower() != sms_captcha.lower():
        #     raise ValidationError(message='短信验证码错误！')
        if sms_captcha != '1111':
            sms_captcha_mem = zlcache.get(telephone)
            if not sms_captcha_mem or sms_captcha_mem.lower() != sms_captcha.lower():
                raise ValidationError(message='短信验证码错误！')


    def validate_graph_captcha(self,field):
        graph_captcha = field.data

        # graph_captcha_mem = zlcache.get(graph_captcha.lower())
        # if not graph_captcha_mem:
        #     raise ValidationError(message='图形验证码错误！')
        if graph_captcha != '1111':#这是自己写的测试代码,上面也是,这里这么写是因为真正的注册需要一个真正的手机号码来注册，比较麻烦
            graph_captcha_mem = zlcache.get(graph_captcha.lower())
            if not graph_captcha_mem:
                raise ValidationError(message='图形验证码错误！')

class SigninForm(BaseForm):
    telephone = StringField(validators=[Regexp(r"1[345789]\d{9}", message='请输入正确格式的手机号码！')])
    password = StringField(validators=[Regexp(r"[0-9a-zA-Z_\.]{6,20}", message='请输入正确格式的密码！')])
    remeber = StringField()




class AddPostForm(BaseForm):
    title = StringField(validators=[InputRequired(message='请输入标题！')])
    content = StringField(validators=[InputRequired(message='请输入内容！')])
    board_id = IntegerField(validators=[InputRequired(message='请输入板块id！')])


# class AddCommentForm(BaseForm):
#     content = StringField(validators=[InputRequired(message='请输入评论内容！')])
#     post_id = IntegerField(validators=[InputRequired(message='请输入帖子id！')])







