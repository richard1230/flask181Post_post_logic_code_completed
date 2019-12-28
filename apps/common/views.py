from flask import  Blueprint,jsonify
import qiniu

bp = Blueprint("common",__name__,url_prefix='/common')

@bp.route('/')
def index():
    return 'common  index'



# @app.route('/uptoken/')
@bp.route('/uptoken/')
def uptoken():#这个需要自己申请一个
    access_key = '6C0-gZV-pWuDoRiRU1tq14P5gW1wFbq0GEtq_zeP'
    secret_key = 'AgPOGPd3MLamYt4U-5rhl8LRcxRxEf_ljrotu0Gn'
    q = qiniu.Auth(access_key,secret_key)

    bucket = 'richard1230'#存储空间名字
    token = q.upload_token(bucket)
    return jsonify({'uptoken':token})