/**
 * 中文（简体）语言包 —— 默认语言，结构与文案从此文件派生。
 * en-US.ts 必须与此文件键结构完全一致（由 MessageSchema 类型约束）。
 */

export default {
  common: {
    webTitle: 'AI 短剧创作',
    requestFailed: '请求失败',
    time: {
      justNow: '刚刚更新',
      minutesAgo: '{n} 分钟前',
      hoursAgo: '{n} 小时前',
      daysAgo: '{n} 天前',
    },
  },
  route: {
    login: '登录',
    home: '创作中心',
    shortDrama: '短剧创作',
  },
  login: {
    rules: {
      usernameRequired: '请输入用户名',
      passwordRequired: '请输入密码',
    },
    errors: {
      noToken: '后台未返回访问令牌',
      fallback: '登录失败，请检查账号或后台服务',
    },
    form: {
      usernameLabel: '用户名',
      usernamePlaceholder: '输入你的用户名',
      passwordLabel: '密码',
      passwordPlaceholder: '输入登录密码',
    },
    submit: {
      idle: '进入创作中心',
      loading: '正在进入工作台',
    },
    hero: {
      titleLead: '从第一句故事，',
      titleTail: '到最后一个镜头。',
      subtitle: '一体化 AI 短剧制作工作台。打磨剧本、建立角色资产、规划分镜，并生成你的最终成片。',
      sceneStrong: '每个灵感\n都值得被看见',
    },
    floatingCard: {
      scriptTitle: '剧本已完成',
      scriptSub: '12 场 · 48 个镜头',
      assetsTitle: '角色资产',
      assetsSub: '风格一致性已锁定',
    },
    feature: {
      scriptTitle: '剧本创作',
      scriptSub: '故事结构与对白',
      assetsTitle: '视觉资产',
      assetsSub: '角色与场景统一',
      shotsTitle: '镜头生成',
      shotsSub: '分镜到最终成片',
    },
    panel: {
      heading: '欢迎回来',
      sub: '登录后继续你的短剧创作',
    },
    access: {
      note: '使用 RuoYi AI 统一账号安全登录',
      connected: '已连接',
    },
    footer: {
      tokenEncrypted: '令牌加密存储',
      cloudSync: '项目云端同步',
    },
  },
  home: {
    hero: {
      titleLead: '把一个灵感，',
      titleTail: '变成一部短剧。',
      subtitle: '从故事构思到角色、场景、分镜和成片，让 AI 接住繁琐流程，你只负责做创作决定。',
      metricAll: '全部项目',
      metricActive: '创作进行中',
      metricStages: '生产阶段',
    },
    pipeline: {
      sceneCopy: '故事正在成为画面',
      charLabel: '角色',
      locLabel: '场景',
      steps: {
        idea: '创意',
        script: '剧本',
        assets: '资产',
        storyboard: '分镜',
      },
    },
    composer: {
      title: '今天想拍什么故事？',
      sub: '一句话也可以，AI 会帮你扩展成完整制作方案',
      placeholder: '例如：一个只能看见别人倒计时的外卖员，在最后一单遇见了没有倒计时的女孩……',
      shortcut: 'Ctrl + Enter 快速开始',
      create: '开始创作',
    },
    section: {
      recentTitle: '继续最近的创作',
      enterWorkbench: '进入项目工作台',
    },
    project: {
      statusArchived: '已归档',
      statusActive: '创作中',
      emptyDesc: '等待你继续完善这个故事。',
    },
    empty: {
      title: '第一部作品正等你开场',
      desc: '在上方写下灵感，开始建立你的短剧项目。',
      useExample: '使用示例灵感',
    },
    exampleIdea: '一个普通人突然获得改变命运的机会，却发现每次选择都需要付出代价。',
    guide: {
      titleLead: '一条清晰的生产线，',
      titleTail: '让每一步都有掌控感。',
      desc: '每个阶段都可检查、修改和重新生成。AI 提供效率，最终判断始终在你手里。',
      continueLast: '继续上次创作',
      steps: {
        s1Title: '创意与剧本',
        s1Desc: '从一句故事梗概扩展人物、冲突和完整剧本。',
        s2Title: '角色与场景',
        s2Desc: '统一角色形象、服装和世界观视觉风格。',
        s3Title: '镜头与表演',
        s3Desc: '规划景别、运镜、站位和演员表演方向。',
        s4Title: '视频与成片',
        s4Desc: '逐镜生成视频，完成转场、画幅和最终合成。',
      },
    },
    keyConfig: {
      entry: 'Key 配置',
      dialogTitle: '一键配置 Atlas Key',
      tip: '填入你的 Atlas Cloud API Key，将批量应用到所有 Atlas 模型（图片 / 视频）。可在 atlascloud.ai 获取。',
      warning: '提交后会覆盖当前所有 Atlas 模型的 Key，请确认无误。',
      label: 'Atlas API Key',
      placeholder: '粘贴你的 Atlas Cloud API Key',
      cancel: '取消',
      save: '保存并应用',
    },
    messages: {
      loadFailed: '项目列表加载失败，请检查后台服务',
      ideaRequired: '先写下你的故事灵感',
      atlasKeyUpdated: 'Atlas Key 已批量更新',
      atlasKeyRequired: '请输入 Atlas Cloud API Key',
    },
  },
  layout: {
    creator: '创作者',
    nav: {
      home: '创作中心',
      shortDrama: '项目工作台',
    },
    newProject: '新建短剧',
    logout: {
      action: '退出登录',
      confirmBody: '退出后需要重新登录才能继续创作。',
      confirmTitle: '确认退出？',
      confirmText: '退出登录',
      cancelText: '取消',
      success: '已退出登录',
    },
    aria: {
      mainNav: '主导航',
    },
  },
  shortDrama: {
    workflow: {
      idea: { title: '创意设定', desc: '输入故事核心与生成偏好' },
      script: { title: '剧本打磨', desc: '编辑大纲、正文与基调' },
      assets: { title: '资产配置', desc: '角色档案与场景站位' },
      storyboard: { title: '分镜确认', desc: '镜头规划与视频提示词' },
    },
    options: {
      artStyle: {
        realistic: '真实写实',
        americanComic: '美式漫画',
        chineseComic: '国漫风格',
        japaneseAnime: '日系动漫',
        custom: '自定义风格',
      },
      ratio: {
        vertical: '竖屏 9:16',
        horizontal: '横屏 16:9',
        square: '方形 1:1',
        landscapeClassic: '横屏 4:3',
        portraitClassic: '竖屏 3:4',
        ultrawide: '超宽屏 21:9',
      },
      transition: {
        none: '无转场',
        dissolve: '溶解',
        fade: '淡入淡出',
        slide: '滑动',
      },
    },
    compose: {
      status: {
        pending: '排队中',
        processing: '合成中',
        done: '已完成',
        failed: '合成失败',
      },
    },
    messages: {
      generateSuccess: '短剧已生成，可查看各阶段结果',
      scriptSaved: '剧本已保存',
    },
  },
};
