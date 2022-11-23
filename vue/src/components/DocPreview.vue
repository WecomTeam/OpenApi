<template>
  <div class="docpreview">
    <div data-v-33ccf100="" class="change_log__master cherry-markdown">
      <p data-type="p"><br><a rel="nofollow"
          href="https://developer.work.weixin.qq.com/document/path/90195">https://developer.work.weixin.qq.com/document/path/90195</a>
      </p>

      <h2 id="%E8%AF%B7%E6%B1%82"><a href="#%E8%AF%B7%E6%B1%82" class="anchor"></a>请求</h2>

      <h3 id="%E5%9F%BA%E6%9C%AC%E4%BF%A1%E6%81%AF"><a href="#%E5%9F%BA%E6%9C%AC%E4%BF%A1%E6%81%AF"
          class="anchor"></a>基本信息</h3>
      <div class="cherry-table-container">
        <table class="cherry-table">
          <thead>
            <tr>
              <th align="left">条目</th>
              <th align="left">说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td align="left">URL</td>
              <td align="left"><a rel="nofollow"
                  href="https://qyapi.weixin.qq.com/cgi-bin/user/create">https://qyapi.weixin.qq.com/cgi-bin/user/create</a>
              </td>
            </tr>
            <tr>
              <td align="left">Method</td>
              <td align="left">undefined</td>
            </tr>
            <tr>
              <td align="left">权限说明</td>
              <td align="left">仅通讯录同步助手或第三方通讯录应用可调用。<br>注意，每个部门下的部门、成员总数不能超过3万个。建议保证创建department对应的部门和创建成员是串行化处理。</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="%E6%9F%A5%E8%AF%A2%E5%8F%82%E6%95%B0"><a href="#%E6%9F%A5%E8%AF%A2%E5%8F%82%E6%95%B0"
          class="anchor"></a>查询参数</h3>
      <div class="cherry-table-container">
        <table class="cherry-table">
          <thead>
            <tr>
              <th>参数</th>
              <th>必须</th>
              <th>类型</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>access_token</td>
              <td>是</td>
              <td>string</td>
              <td>无</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="%E8%AF%B7%E6%B1%82%E4%BD%93"><a href="#%E8%AF%B7%E6%B1%82%E4%BD%93" class="anchor"></a>请求体</h3>
      <div class="cherry-table-container">
        <table class="cherry-table">
          <thead>
            <tr>
              <th>参数</th>
              <th>必须</th>
              <th>类型</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>userid</td>
              <td>是</td>
              <td>string</td>
              <td>成员UserID。对应管理端的帐号，企业内必须唯一。长度为1~64个字节。只能由数字、字母和“_-@.”四种字符组成，且第一个字符必须是数字或字母。系统进行唯一性检查时会忽略大小写。</td>
            </tr>
            <tr>
              <td>name</td>
              <td>是</td>
              <td>string</td>
              <td>成员名称。长度为1~64个utf8字符</td>
            </tr>
            <tr>
              <td>alias</td>
              <td>是</td>
              <td>string</td>
              <td>成员别名。长度1~64个utf8字符</td>
            </tr>
            <tr>
              <td>mobile</td>
              <td>是</td>
              <td>string</td>
              <td>手机号码。企业内必须唯一，<strong>mobile/email二者不能同时为空</strong></td>
            </tr>
            <tr>
              <td>department</td>
              <td>是</td>
              <td>array</td>
              <td>成员所属部门id列表，不超过100个</td>
            </tr>
            <tr>
              <td>order</td>
              <td>是</td>
              <td>array</td>
              <td>部门内的排序值，默认为0，成员次序以创建时间从小到大排列。个数必须和参数department的个数一致，数值越大排序越前面。有效的值范围是[0, 2^32)</td>
            </tr>
            <tr>
              <td>position</td>
              <td>是</td>
              <td>string</td>
              <td>职务信息。长度为0~128个字符</td>
            </tr>
            <tr>
              <td>gender</td>
              <td>是</td>
              <td>string</td>
              <td>性别。1表示男性，2表示女性</td>
            </tr>
            <tr>
              <td>email</td>
              <td>是</td>
              <td>string</td>
              <td>邮箱。长度6~64个字节，且为有效的email格式。企业内必须唯一，mobile/email二者不能同时为空</td>
            </tr>
            <tr>
              <td>biz_mail</td>
              <td>是</td>
              <td>string</td>
              <td>
                企业邮箱。仅对开通企业邮箱的企业有效。长度6~64个字节，且为有效的企业邮箱格式。企业内必须唯一。未填写则系统会为用户生成默认企业邮箱（由系统生成的邮箱可修改一次，2022年4月25日之后创建的成员需通过企业管理后台-协作-邮件-邮箱管理-成员邮箱修改）
              </td>
            </tr>
            <tr>
              <td>is_leader_in_dept</td>
              <td>是</td>
              <td>array</td>
              <td>个数必须和参数department的个数一致，表示在所在的部门内是否为部门负责人。1表示为部门负责人，0表示非部门负责人。在审批(<a rel="nofollow"
                  href="#17893">自建</a>、<a rel="nofollow" href="#18403">第三方</a>)等应用里可以用来标识上级审批人</td>
            </tr>
            <tr>
              <td>direct_leader</td>
              <td>是</td>
              <td>array</td>
              <td>直属上级UserID，设置范围为企业内成员，可以设置最多5个上级</td>
            </tr>
            <tr>
              <td>enable</td>
              <td>是</td>
              <td>number</td>
              <td>启用/禁用成员。1表示启用成员，0表示禁用成员</td>
            </tr>
            <tr>
              <td>avatar_mediaid</td>
              <td>是</td>
              <td>string</td>
              <td>成员头像的mediaid，通过<a rel="nofollow" href="#90000/90135/91054">素材管理</a>接口上传图片获得的mediaid</td>
            </tr>
            <tr>
              <td>telephone</td>
              <td>是</td>
              <td>string</td>
              <td>座机。32字节以内，由纯数字、“-”、“+”或“,”组成。</td>
            </tr>
            <tr>
              <td>address</td>
              <td>是</td>
              <td>string</td>
              <td>地址。长度最大128个字符</td>
            </tr>
            <tr>
              <td>main_department</td>
              <td>是</td>
              <td>number</td>
              <td>主部门</td>
            </tr>
            <tr>
              <td>extattr</td>
              <td>是</td>
              <td>object</td>
              <td>自定义字段。自定义字段需要先在WEB管理端添加，见<a rel="nofollow"
                  href="#10016/%E6%89%A9%E5%B1%95%E5%B1%9E%E6%80%A7%E7%9A%84%E6%B7%BB%E5%8A%A0%E6%96%B9%E6%B3%95">扩展属性添加方法</a>，否则忽略未知属性的赋值。
              </td>
            </tr>
            <tr>
              <td>extattr.attrs</td>
              <td>否</td>
              <td>array</td>
              <td>无</td>
            </tr>
            <tr>
              <td>to_invite</td>
              <td>是</td>
              <td>string</td>
              <td>是否邀请该成员使用企业微信（将通过微信服务通知或短信或邮件下发邀请，每天自动下发一次，最多持续3个工作日），默认值为true。</td>
            </tr>
            <tr>
              <td>external_position</td>
              <td>是</td>
              <td>string</td>
              <td>对外职务，如果设置了该值，则以此作为对外展示的职务，否则以position来展示。长度12个汉字内</td>
            </tr>
            <tr>
              <td>external_profile</td>
              <td>是</td>
              <td>object</td>
              <td>成员对外属性，字段详情见<a rel="nofollow" href="#13450">对外属性</a></td>
            </tr>
            <tr>
              <td>external_profile.external_corp_name</td>
              <td>否</td>
              <td>string</td>
              <td>企业对外简称，需从已认证的企业简称中选填。可在“我的企业”页中查看企业简称认证状态</td>
            </tr>
            <tr>
              <td>external_profile.wechat_channels</td>
              <td>否</td>
              <td>object</td>
              <td>视频号属性。须从企业绑定到企业微信的视频号中选择，可在“我的企业”页中查看绑定的视频号。第三方仅通讯录应用可获取；对于非第三方创建的成员，第三方通讯录应用也不可获取。</td>
            </tr>
            <tr>
              <td>external_profile.wechat_channels.nickname</td>
              <td>否</td>
              <td>string</td>
              <td>视频号名字（设置后，成员将对外展示该视频号）</td>
            </tr>
            <tr>
              <td>external_profile.wechat_channels.status</td>
              <td>否</td>
              <td>number</td>
              <td>对外展示视频号状态。0表示企业视频号已被确认，可正常使用，1表示企业视频号待确认</td>
            </tr>
            <tr>
              <td>external_profile.external_attr</td>
              <td>否</td>
              <td>array</td>
              <td>属性列表，目前支持文本、网页、小程序三种类型</td>
            </tr>
            <tr>
              <td>external_profile.external_attr.type</td>
              <td>否</td>
              <td>number</td>
              <td>属性类型: 0-文本 1-网页 2-小程序</td>
            </tr>
            <tr>
              <td>external_profile.external_attr.name</td>
              <td>否</td>
              <td>string</td>
              <td>属性名称： 需要先确保在管理端有创建该属性，否则会忽略</td>
            </tr>
            <tr>
              <td>external_profile.external_attr.text</td>
              <td>否</td>
              <td>object</td>
              <td>文本类型的属性</td>
            </tr>
            <tr>
              <td>external_profile.external_attr.text.value</td>
              <td>否</td>
              <td>string</td>
              <td>文本属性内容，长度限制32个UTF8字符</td>
            </tr>
            <tr>
              <td>external_profile.external_attr.web</td>
              <td>否</td>
              <td>object</td>
              <td>网页类型的属性，url和title字段要么同时为空表示清除该属性，要么同时不为空</td>
            </tr>
            <tr>
              <td>external_profile.external_attr.web.url</td>
              <td>否</td>
              <td>string</td>
              <td>网页的url，必须包含http或者https头</td>
            </tr>
            <tr>
              <td>external_profile.external_attr.web.title</td>
              <td>否</td>
              <td>string</td>
              <td>网页的展示标题，长度限制12个UTF8字符</td>
            </tr>
            <tr>
              <td>external_profile.external_attr.miniprogram</td>
              <td>否</td>
              <td>object</td>
              <td>文本类型的属性</td>
            </tr>
            <tr>
              <td>external_profile.external_attr.miniprogram.appid</td>
              <td>否</td>
              <td>string</td>
              <td>小程序appid，必须是有在本企业安装授权的小程序，否则会被忽略</td>
            </tr>
            <tr>
              <td>external_profile.external_attr.miniprogram.pagepath</td>
              <td>否</td>
              <td>string</td>
              <td>小程序的页面路径</td>
            </tr>
            <tr>
              <td>external_profile.external_attr.miniprogram.title</td>
              <td>否</td>
              <td>string</td>
              <td>小程序的展示标题，长度限制12个UTF8字符</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="%E8%AF%B7%E6%B1%82%E7%A4%BA%E4%BE%8B"><a href="#%E8%AF%B7%E6%B1%82%E7%A4%BA%E4%BE%8B"
          class="anchor"></a>请求示例</h3>
      <div data-sign="0b288bd94254ddcc5f2980b84025bee9" data-type="codeBlock" data-lines="61">
        <pre class="language-javascript"><code class="language-javascript wrap"><span class="code-line"><span class="token punctuation">{</span></span>
<span class="code-line">  <span class="token string">"userid"</span><span class="token operator">:</span> <span class="token string">"zhangsan"</span><span class="token punctuation">,</span></span>
<span class="code-line">  <span class="token string">"name"</span><span class="token operator">:</span> <span class="token string">"张三"</span><span class="token punctuation">,</span></span>
<span class="code-line">  <span class="token string">"alias"</span><span class="token operator">:</span> <span class="token string">"jackzhang"</span><span class="token punctuation">,</span></span>
<span class="code-line">  <span class="token string">"mobile"</span><span class="token operator">:</span> <span class="token string">"+86 13800000000"</span><span class="token punctuation">,</span></span>
<span class="code-line">  <span class="token string">"department"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="code-line">    <span class="token string">"[object Object]"</span></span>
<span class="code-line">  <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="code-line">  <span class="token string">"order"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="code-line">    <span class="token string">"[object Object]"</span></span>
<span class="code-line">  <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="code-line">  <span class="token string">"position"</span><span class="token operator">:</span> <span class="token string">"产品经理"</span><span class="token punctuation">,</span></span>
<span class="code-line">  <span class="token string">"gender"</span><span class="token operator">:</span> <span class="token string">"1"</span><span class="token punctuation">,</span></span>
<span class="code-line">  <span class="token string">"email"</span><span class="token operator">:</span> <span class="token string">"zhangsan@gzdev.com"</span><span class="token punctuation">,</span></span>
<span class="code-line">  <span class="token string">"biz_mail"</span><span class="token operator">:</span> <span class="token string">"zhangsan@qyycs2.wecom.work"</span><span class="token punctuation">,</span></span>
<span class="code-line">  <span class="token string">"is_leader_in_dept"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="code-line">    <span class="token string">"[object Object]"</span></span>
<span class="code-line">  <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="code-line">  <span class="token string">"direct_leader"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="code-line">    <span class="token string">"[object Object]"</span></span>
<span class="code-line">  <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="code-line">  <span class="token string">"enable"</span><span class="token operator">:</span> <span class="token string">"1"</span><span class="token punctuation">,</span></span>
<span class="code-line">  <span class="token string">"avatar_mediaid"</span><span class="token operator">:</span> <span class="token string">"2-G6nrLmr5EC3MNb_-zL1dDdzkd0p7cNliYu9V5w7o8K0"</span><span class="token punctuation">,</span></span>
<span class="code-line">  <span class="token string">"telephone"</span><span class="token operator">:</span> <span class="token string">"020-123456"</span><span class="token punctuation">,</span></span>
<span class="code-line">  <span class="token string">"address"</span><span class="token operator">:</span> <span class="token string">"广州市海珠区新港中路"</span><span class="token punctuation">,</span></span>
<span class="code-line">  <span class="token string">"main_department"</span><span class="token operator">:</span> <span class="token string">"1"</span><span class="token punctuation">,</span></span>
<span class="code-line">  <span class="token string">"extattr"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="code-line">    <span class="token string">"attrs"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="code-line">      <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="code-line">    <span class="token punctuation">]</span></span>
<span class="code-line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="code-line">  <span class="token string">"to_invite"</span><span class="token operator">:</span> <span class="token string">"true"</span><span class="token punctuation">,</span></span>
<span class="code-line">  <span class="token string">"external_position"</span><span class="token operator">:</span> <span class="token string">"高级产品经理"</span><span class="token punctuation">,</span></span>
<span class="code-line">  <span class="token string">"external_profile"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="code-line">    <span class="token string">"external_corp_name"</span><span class="token operator">:</span> <span class="token string">"企业简称"</span><span class="token punctuation">,</span></span>
<span class="code-line">    <span class="token string">"wechat_channels"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="code-line">      <span class="token string">"nickname"</span><span class="token operator">:</span> <span class="token string">"视频号名称"</span><span class="token punctuation">,</span></span>
<span class="code-line">      <span class="token string">"status"</span><span class="token operator">:</span> <span class="token string">"1"</span></span>
<span class="code-line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="code-line">    <span class="token string">"external_attr"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="code-line">      <span class="token punctuation">{</span></span>
<span class="code-line">        <span class="token string">"type"</span><span class="token operator">:</span> <span class="token string">"0"</span><span class="token punctuation">,</span></span>
<span class="code-line">        <span class="token string">"name"</span><span class="token operator">:</span> <span class="token string">"网页名称"</span><span class="token punctuation">,</span></span>
<span class="code-line">        <span class="token string">"text"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="code-line">          <span class="token string">"value"</span><span class="token operator">:</span> <span class="token string">"文本"</span></span>
<span class="code-line">        <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="code-line">        <span class="token string">"web"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="code-line">          <span class="token string">"url"</span><span class="token operator">:</span> <span class="token string">"http://www.test.com"</span><span class="token punctuation">,</span></span>
<span class="code-line">          <span class="token string">"title"</span><span class="token operator">:</span> <span class="token string">"标题"</span></span>
<span class="code-line">        <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="code-line">        <span class="token string">"miniprogram"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="code-line">          <span class="token string">"appid"</span><span class="token operator">:</span> <span class="token string">"wx8bd80126147dfAAA"</span><span class="token punctuation">,</span></span>
<span class="code-line">          <span class="token string">"pagepath"</span><span class="token operator">:</span> <span class="token string">"/index"</span><span class="token punctuation">,</span></span>
<span class="code-line">          <span class="token string">"title"</span><span class="token operator">:</span> <span class="token string">"miniprogram"</span></span>
<span class="code-line">        <span class="token punctuation">}</span></span>
<span class="code-line">      <span class="token punctuation">}</span></span>
<span class="code-line">    <span class="token punctuation">]</span></span>
<span class="code-line">  <span class="token punctuation">}</span></span>
<span class="code-line"><span class="token punctuation">}</span></span></code></pre>
      </div>

      <h2 id="%E5%93%8D%E5%BA%94"><a href="#%E5%93%8D%E5%BA%94" class="anchor"></a>响应</h2>

      <h3 id="%E5%93%8D%E5%BA%94%E4%BD%93"><a href="#%E5%93%8D%E5%BA%94%E4%BD%93" class="anchor"></a>响应体</h3>
      <div class="cherry-table-container">
        <table class="cherry-table">
          <thead>
            <tr>
              <th align="left">参数</th>
              <th align="left">说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td align="left">errcode</td>
              <td align="left">返回码</td>
            </tr>
            <tr>
              <td align="left">errmsg</td>
              <td align="left">对返回码的文本描述内容</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="%E5%93%8D%E5%BA%94%E7%A4%BA%E4%BE%8B"><a href="#%E5%93%8D%E5%BA%94%E7%A4%BA%E4%BE%8B"
          class="anchor"></a>响应示例</h3>
      <div data-sign="d06f024db3b2b22078394a96b301ddd0" data-type="codeBlock" data-lines="6">
        <pre class="language-javascript"><code class="language-javascript wrap"><span class="code-line"><span class="token punctuation">{</span></span>
<span class="code-line">  <span class="token string">"errcode"</span><span class="token operator">:</span> <span class="token string">"0"</span><span class="token punctuation">,</span></span>
<span class="code-line">  <span class="token string">"errmsg"</span><span class="token operator">:</span> <span class="token string">"created"</span></span>
<span class="code-line"><span class="token punctuation">}</span></span></code></pre>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'DocPreview',
  props: {

  }
}
</script>


<style scoped>
.docpreview{
  padding:30px;
}
</style>
