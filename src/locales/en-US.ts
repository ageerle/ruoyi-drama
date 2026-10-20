import type { MessageSchema } from './types';

/*
public void (){


}
*/


const enUS: MessageSchema = {
  common: {
    webTitle: 'AI Short Drama Studio',
    requestFailed: 'Request failed',
    loginRequired: 'Please sign in',
    time: {
      justNow: 'just now',
      minutesAgo: '{n} min ago',
      hoursAgo: '{n} h ago',
      daysAgo: '{n} d ago',
    },
  },
  route: {
    login: 'Login',
    home: 'Studio',
    shortDrama: 'Short Drama',
  },
  login: {
    rules: {
      usernameRequired: 'Please enter your username',
      passwordRequired: 'Please enter your password',
    },
    errors: {
      noToken: 'No access token returned from the server',
      fallback: 'Login failed, please check your account or backend service',
    },
    form: {
      usernameLabel: 'Username',
      usernamePlaceholder: 'Enter your username',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter your password',
    },
    submit: {
      idle: 'Enter Studio',
      loading: 'Entering workspace',
    },
    hero: {
      titleLead: 'From the first line of story,',
      titleTail: 'to the final shot.',
      subtitle: 'An all-in-one AI short-drama workbench. Polish scripts, build character assets, plan storyboards, and render your final cut.',
      sceneStrong: 'Every spark\n deserves to be seen',
    },
    floatingCard: {
      scriptTitle: 'Script ready',
      scriptSub: '12 scenes · 48 shots',
      assetsTitle: 'Character assets',
      assetsSub: 'Style consistency locked',
    },
    feature: {
      scriptTitle: 'Scriptwriting',
      scriptSub: 'Story structure & dialogue',
      assetsTitle: 'Visual assets',
      assetsSub: 'Unified characters & scenes',
      shotsTitle: 'Shot generation',
      shotsSub: 'Storyboard to final cut',
    },
    panel: {
      heading: 'Welcome back',
      sub: 'Sign in to continue your short-drama creation',
    },
    access: {
      note: 'Secure sign-in with your RuoYi AI account',
      connected: 'Connected',
    },
    footer: {
      tokenEncrypted: 'Token encrypted',
      cloudSync: 'Cloud sync',
    },
  },
  home: {
    hero: {
      titleLead: 'Turn a single spark',
      titleTail: 'into a short drama.',
      subtitle: 'From story idea to characters, scenes, storyboards and the final cut — let AI handle the tedious flow, you make the creative calls.',
      metricAll: 'All projects',
      metricActive: 'In progress',
      metricStages: 'Stages',
    },
    pipeline: {
      sceneCopy: 'The story is becoming frames',
      charLabel: 'Characters',
      locLabel: 'Scenes',
      steps: {
        idea: 'Idea',
        script: 'Script',
        assets: 'Assets',
        storyboard: 'Storyboard',
      },
    },
    composer: {
      title: 'What story do you want to shoot today?',
      sub: 'Even one sentence works — AI will expand it into a full production plan',
      placeholder: 'e.g. A delivery rider who can only see others\' countdowns meets a girl with no countdown on his last order…',
      shortcut: 'Ctrl + Enter to start',
      create: 'Start creating',
    },
    section: {
      recentTitle: 'Continue recent work',
      enterWorkbench: 'Open project workbench',
    },
    project: {
      statusArchived: 'Archived',
      statusActive: 'Creating',
      emptyDesc: 'Waiting for you to keep shaping this story.',
    },
    empty: {
      title: 'Your first piece is waiting to begin',
      desc: 'Write your idea above to start a short-drama project.',
      useExample: 'Use sample idea',
    },
    exampleIdea: 'An ordinary person suddenly gets a chance to change their fate, only to find every choice demands a price.',
    guide: {
      titleLead: 'A clear production line,',
      titleTail: 'with control at every step.',
      desc: 'Every stage is reviewable, editable and regenerable. AI brings efficiency; the final call is always yours.',
      continueLast: 'Continue last work',
      steps: {
        s1Title: 'Idea & script',
        s1Desc: 'Expand characters, conflicts and a full script from a one-line synopsis.',
        s2Title: 'Characters & scenes',
        s2Desc: 'Unify character looks, costumes and the world\'s visual style.',
        s3Title: 'Shots & acting',
        s3Desc: 'Plan shot size, camera movement, blocking and acting direction.',
        s4Title: 'Video & final cut',
        s4Desc: 'Generate video per shot, finish transitions, aspect ratio and final compositing.',
      },
    },
    keyConfig: {
      entry: 'Key config',
      dialogTitle: 'One-click Atlas Key setup',
      tip: 'One API Key for all Atlas models.',
      getKey: 'Get a Key',
      warning: 'Saving replaces existing Atlas keys.',
      label: 'Atlas API Key',
      placeholder: 'Paste your Atlas Cloud API Key',
      cancel: 'Cancel',
      save: 'Save & apply',
    },
    messages: {
      loadFailed: 'Failed to load project list, please check the backend service',
      ideaRequired: 'Write down your story idea first',
      atlasKeyUpdated: 'Atlas Key updated in bulk',
      atlasKeyRequired: 'Please enter an Atlas Cloud API Key',
    },
  },


  skillMarket: {
    intro: 'Browse the current drama prompts, production skills, aesthetics and directing styles.',
    refresh: 'Refresh', search: 'Search drama skills and prompts', empty: 'No matching content',
    loadFailed: 'Could not load drama skills', copy: 'Copy content', copied: 'Content copied', copyFailed: 'Copy failed; select the text manually',
    version: 'Version', enabled: 'Enabled', disabled: 'Disabled',
    categories: { system: 'System prompts', production: 'Production skills', screenwriting: 'Writing styles', aesthetic: 'Visual styles', director: 'Directing styles' },
  },
  layout: {
    skillMarket: 'Skill market',
    creator: 'Creator',
    nav: {
      home: 'Studio',
      shortDrama: 'Workbench',
    },
    newProject: 'New drama',
    logout: {
      action: 'Log out',
      confirmBody: 'You will need to sign in again to continue creating.',
      confirmTitle: 'Confirm log out?',
      confirmText: 'Log out',
      cancelText: 'Cancel',
      success: 'Logged out',
    },
    aria: {
      mainNav: 'Main navigation',
    },
  },
  shortDrama: {
    workflow: {
      idea: { title: 'Story idea', desc: 'Enter the story core and generate a script' },
      script: { title: 'Script review', desc: 'Review the script or submit revision notes' },
      assets: { title: 'Asset config', desc: 'Character profiles & scene blocking' },
      storyboard: { title: 'Storyboard', desc: 'Shot planning & video prompts' },
    },
    options: {
      artStyle: {
        scriptTone: 'Script style / tone',
        realistic: 'Realistic',
        americanComic: 'American comic',
        chineseComic: 'Chinese comic',
        chinese3d: 'Chinese 3D animation',
        japaneseAnime: 'Japanese anime',
        custom: 'Custom style',
      },
      ratio: {
        vertical: 'Vertical 9:16',
        horizontal: 'Horizontal 16:9',
        square: 'Square 1:1',
        landscapeClassic: 'Landscape 4:3',
        portraitClassic: 'Portrait 3:4',
        ultrawide: 'Ultrawide 21:9',
      },
      transition: {
        none: 'No transition',
        dissolve: 'Dissolve',
        fade: 'Fade',
        slide: 'Slide',
      },
    },
    compose: {
      status: {
        pending: 'Queued',
        processing: 'Composing',
        done: 'Done',
        failed: 'Compose failed',
      },
    },
    messages: {
      generateSuccess: 'Short drama generated — review each stage',
      scriptSaved: 'Script saved',
    },
  },
};

export default enUS;
