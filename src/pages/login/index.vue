<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import type { LoginRequest, LoginResponse } from '@/api/auth/types';
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import LocaleSwitcher from '@/components/LocaleSwitcher.vue';
import { login } from '@/api/auth';
import { useUserStore } from '@/stores';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const { t } = useI18n();
const formRef = ref<FormInstance>();
const submitting = ref(false);
const errorMessage = ref('');

const form = reactive<LoginRequest>({
  username: 'admin',
  password: 'admin123',
  clientId: import.meta.env.VITE_CLIENT_ID,
  grantType: 'password',
  tenantId: '000000',
  uuid: 'a5705def96be468f80e4b8bde3127c31',
});

const rules = computed<FormRules<LoginRequest>>(() => ({
  username: [{ required: true, message: t('login.rules.usernameRequired'), trigger: 'blur' }],
  password: [{ required: true, message: t('login.rules.passwordRequired'), trigger: 'blur' }],
}));

async function handleLogin() {
  await formRef.value?.validate();
  submitting.value = true;
  errorMessage.value = '';
  try {
    const response = await login(form);
    const payload = ((response as unknown as { data?: LoginResponse }).data || response) as LoginResponse;
    const token = payload.access_token || payload.token;
    if (!token) throw new Error(t('login.errors.noToken'));
    userStore.setToken(token);
    userStore.setUserInfo(payload.userInfo || { username: form.username });
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/home';
    await router.replace(redirect);
  }
  catch (error) {
    errorMessage.value = error instanceof Error ? error.message : t('login.errors.fallback');
  }
  finally {
    submitting.value = false;
  }
}
</script>

<template>
  <div class="login-page">
    <div class="noise" />
    <header class="login-header">
      <div class="brand">
        <span class="brand-mark"><i /><el-icon><VideoCameraFilled /></el-icon></span>
        <div><strong>RUOYI <em>DRAMA</em></strong><small>AI STORY STUDIO</small></div>
      </div>
      <div class="login-header-right">
        <div class="system-state"><b /> SYSTEM READY <span>·</span> V1.0</div>
        <LocaleSwitcher />
      </div>
    </header>

    <main class="login-main">
      <section class="story-stage">
        <div class="stage-kicker"><span>AI NARRATIVE PRODUCTION</span><i /></div>
        <h1>{{ t('login.hero.titleLead') }}<br>{{ t('login.hero.titleTail') }}</h1>
        <p>{{ t('login.hero.subtitle') }}</p>

        <div class="stage-visual">
          <div class="viewfinder">
            <i class="corner lt" /><i class="corner rt" /><i class="corner lb" /><i class="corner rb" />
            <div class="recording"><b /> REC</div>
            <div class="scene-copy"><span>SCENE 01 · TAKE 03</span><strong>{{ t('login.hero.sceneStrong') }}</strong><small>RUOYI DRAMA ORIGINAL</small></div>
            <div class="focus-ring"><el-icon><VideoPlay /></el-icon></div>
          </div>
          <div class="floating-card card-script"><span><el-icon><EditPen /></el-icon></span><div><strong>{{ t('login.floatingCard.scriptTitle') }}</strong><small>{{ t('login.floatingCard.scriptSub') }}</small></div><b>100%</b></div>
          <div class="floating-card card-assets"><span><el-icon><Avatar /></el-icon></span><div><strong>{{ t('login.floatingCard.assetsTitle') }}</strong><small>{{ t('login.floatingCard.assetsSub') }}</small></div><i><el-icon><Check /></el-icon></i></div>
          <div class="timeline"><span>00:00</span><div><i /><b /><i /><i /><b /><i /></div><span>02:36</span></div>
        </div>

        <div class="feature-strip">
          <div><span>01</span><strong>{{ t('login.feature.scriptTitle') }}</strong><small>{{ t('login.feature.scriptSub') }}</small></div>
          <i />
          <div><span>02</span><strong>{{ t('login.feature.assetsTitle') }}</strong><small>{{ t('login.feature.assetsSub') }}</small></div>
          <i />
          <div><span>03</span><strong>{{ t('login.feature.shotsTitle') }}</strong><small>{{ t('login.feature.shotsSub') }}</small></div>
        </div>
      </section>

      <section class="login-panel-wrap">
        <div class="login-panel">
          <div class="panel-number">01 / LOGIN</div>
          <div class="panel-heading">
            <span class="panel-icon"><el-icon><Clapperboard /></el-icon></span>
            <div><h2>{{ t('login.panel.heading') }}</h2><p>{{ t('login.panel.sub') }}</p></div>
          </div>

          <div class="access-note"><el-icon><Connection /></el-icon><span>{{ t('login.access.note') }}</span><b>{{ t('login.access.connected') }}</b></div>

          <el-alert v-if="errorMessage" class="login-error" :title="errorMessage" type="error" :closable="false" show-icon />

          <el-form ref="formRef" :model="form" :rules="rules" label-position="top" @submit.prevent="handleLogin">
            <el-form-item :label="t('login.form.usernameLabel')" prop="username">
              <el-input v-model="form.username" size="large" :placeholder="t('login.form.usernamePlaceholder')" autocomplete="username" @input="errorMessage = ''">
                <template #prefix><el-icon><User /></el-icon></template>
              </el-input>
            </el-form-item>
            <el-form-item :label="t('login.form.passwordLabel')" prop="password">
              <el-input v-model="form.password" size="large" type="password" show-password :placeholder="t('login.form.passwordPlaceholder')" autocomplete="current-password" @input="errorMessage = ''">
                <template #prefix><el-icon><Lock /></el-icon></template>
              </el-input>
            </el-form-item>
            <el-button class="submit" type="primary" size="large" native-type="submit" :loading="submitting">
              <span>{{ submitting ? t('login.submit.loading') : t('login.submit.idle') }}</span><el-icon v-if="!submitting"><Right /></el-icon>
            </el-button>
          </el-form>

          <div class="panel-footer">
            <span><el-icon><Lock /></el-icon>{{ t('login.footer.tokenEncrypted') }}</span>
            <span><el-icon><Cloudy /></el-icon>{{ t('login.footer.cloudSync') }}</span>
          </div>
        </div>
        <p class="copyright">RUOYI DRAMA · AI SHORT FILM PRODUCTION SUITE</p>
      </section>
    </main>
  </div>
</template>

<style scoped lang="scss">
.login-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden auto;
  color: #0f172a;
  background:
    radial-gradient(circle at 18% 20%, rgb(37 99 235 / 18%), transparent 31%),
    radial-gradient(circle at 68% 78%, rgb(56 189 248 / 18%), transparent 28%),
    linear-gradient(125deg, #eef6ff 0%, #f7fbff 52%, #ecfeff 100%);
}

.noise { position: fixed; inset: 0; pointer-events: none; opacity: .26; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.08'/%3E%3C/svg%3E"); }

.login-header {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 76px;
  padding: 0 clamp(24px, 4vw, 68px);
  background: rgb(255 255 255 / 46%);
  border-bottom: 1px solid rgb(191 219 254 / 70%);
  backdrop-filter: blur(16px);
}

.brand { display: flex; gap: 11px; align-items: center; }
.brand-mark { position: relative; display: grid; width: 39px; height: 39px; color: #fff; background: linear-gradient(145deg, #2563eb, #38bdf8); border-radius: 11px; box-shadow: 0 8px 24px rgb(37 99 235 / 25%); place-items: center; }
.brand-mark i { position: absolute; inset: 5px; border: 1px solid rgb(255 255 255 / 25%); border-radius: 6px; }
.brand-mark .el-icon { position: relative; }
.brand > div { display: grid; gap: 2px; }
.brand strong { font-size: 14px; letter-spacing: .05em; }
.brand em { font-style: normal; color: #2563eb; }
.brand small { font: 700 8px/1 monospace; letter-spacing: .18em; color: #7890b2; }
.system-state { display: flex; gap: 7px; align-items: center; font: 700 9px/1 monospace; letter-spacing: .13em; color: #64748b; }
.system-state b { width: 6px; height: 6px; background: #54c18b; border-radius: 50%; box-shadow: 0 0 0 4px rgb(84 193 139 / 10%), 0 0 12px rgb(84 193 139 / 55%); }
.system-state span { color: #cbd5e1; }
.login-header-right { display: flex; gap: 14px; align-items: center; }

.login-main {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(400px, .85fr);
  gap: clamp(50px, 8vw, 130px);
  align-items: center;
  width: min(1480px, calc(100% - 72px));
  min-height: calc(100vh - 76px);
  padding: 56px 0 70px;
  margin: 0 auto;
}

.story-stage { max-width: 800px; }
.stage-kicker { display: flex; gap: 14px; align-items: center; font: 700 10px/1 monospace; letter-spacing: .18em; color: #2563eb; }
.stage-kicker i { width: 80px; height: 1px; background: linear-gradient(90deg, #38bdf8, transparent); }
.story-stage > h1 { margin: 22px 0 20px; font-size: clamp(48px, 5vw, 78px); font-weight: 620; line-height: 1.08; letter-spacing: -.055em; }
.story-stage > p { max-width: 650px; margin: 0; font-size: 15px; line-height: 1.9; color: #64748b; }

.stage-visual { position: relative; width: min(100%, 690px); height: 300px; margin: 42px 0 34px; }
.viewfinder { position: absolute; inset: 0 70px 20px 0; overflow: hidden; color: #fff8e8; background: radial-gradient(circle at 67% 30%, #71531d 0%, #3c2b10 24%, #17140e 61%, #050505 100%); border: 1px solid rgb(224 186 92 / 48%); border-radius: 18px; box-shadow: 0 30px 70px rgb(40 29 9 / 38%); }
.viewfinder::before { position: absolute; inset: 0; content: ''; background: linear-gradient(90deg, rgb(0 0 0 / 42%), transparent 42%, rgb(0 0 0 / 18%)), radial-gradient(circle at 70% 26%, rgb(255 218 126 / 12%), transparent 34%), repeating-linear-gradient(0deg, rgb(255 238 194 / 2%) 0 1px, transparent 1px 4px); }
.corner { position: absolute; z-index: 2; width: 18px; height: 18px; opacity: .58; }
.corner.lt { top: 18px; left: 18px; border-top: 1px solid #fff; border-left: 1px solid #fff; }
.corner.rt { top: 18px; right: 18px; border-top: 1px solid #fff; border-right: 1px solid #fff; }
.corner.lb { bottom: 18px; left: 18px; border-bottom: 1px solid #fff; border-left: 1px solid #fff; }
.corner.rb { right: 18px; bottom: 18px; border-right: 1px solid #fff; border-bottom: 1px solid #fff; }
.recording { position: absolute; top: 18px; right: 48px; z-index: 2; display: flex; gap: 6px; align-items: center; font: 700 9px/1 monospace; letter-spacing: .1em; color: #ef9a9a; }
.recording b { width: 6px; height: 6px; background: #e66f75; border-radius: 50%; box-shadow: 0 0 8px #e66f75; animation: pulse 1.6s infinite; }
.scene-copy { position: absolute; top: 54px; left: 48px; z-index: 2; display: grid; gap: 13px; }
.scene-copy > span, .scene-copy > small { font: 700 8px/1 monospace; letter-spacing: .13em; color: rgb(255 255 255 / 48%); }
.scene-copy strong { font-size: 27px; font-weight: 580; line-height: 1.28; }
.focus-ring { position: absolute; right: 25%; bottom: 29%; z-index: 2; display: grid; width: 54px; height: 54px; font-size: 22px; color: rgb(255 226 153 / 82%); border: 1px solid rgb(232 194 102 / 42%); border-radius: 50%; box-shadow: inset 0 0 0 7px rgb(226 183 78 / 5%), 0 0 24px rgb(205 151 41 / 12%); place-items: center; }

.floating-card { position: absolute; z-index: 3; display: grid; grid-template-columns: 36px 1fr auto; gap: 10px; align-items: center; width: 230px; padding: 11px; color: #f4ecd9; background: rgb(18 17 14 / 94%); border: 1px solid rgb(219 179 83 / 38%); border-radius: 13px; box-shadow: 0 16px 40px rgb(0 0 0 / 38%); backdrop-filter: blur(12px); }
.floating-card > span { display: grid; width: 34px; height: 34px; color: #e4bd62; background: #2b2416; border: 1px solid rgb(220 177 77 / 18%); border-radius: 9px; place-items: center; }
.floating-card > div { display: grid; gap: 3px; }
.floating-card strong { font-size: 11px; }
.floating-card small { font-size: 9px; color: #9f9684; }
.floating-card > b { font: 700 10px/1 monospace; color: #e0b95c; }
.floating-card > i { display: grid; width: 22px; height: 22px; font-style: normal; color: #161108; background: linear-gradient(145deg, #f0d183, #b88629); border-radius: 50%; place-items: center; }
.card-script { top: 40px; right: 0; }
.card-assets { right: 26px; bottom: 0; }
.timeline { position: absolute; right: 92px; bottom: 28px; z-index: 2; display: flex; gap: 8px; align-items: center; font: 700 8px/1 monospace; color: rgb(255 255 255 / 48%); }
.timeline div { display: flex; gap: 3px; align-items: center; }
.timeline i, .timeline b { display: block; width: 16px; height: 3px; background: rgb(255 255 255 / 26%); border-radius: 2px; }
.timeline b { width: 28px; background: #d5aa4c; box-shadow: 0 0 10px rgb(213 170 76 / 30%); }

.feature-strip { display: flex; gap: 24px; align-items: center; }
.feature-strip > div { display: grid; grid-template-columns: 23px 1fr; gap: 2px 8px; }
.feature-strip span { grid-row: 1 / 3; font: 700 10px/1 monospace; color: #2563eb; }
.feature-strip strong { font-size: 11px; }
.feature-strip small { font-size: 9px; color: #64748b; }
.feature-strip > i { width: 1px; height: 28px; background: #cbd5e1; }

.login-panel-wrap { width: min(100%, 480px); margin-left: auto; }
.login-panel { position: relative; padding: clamp(30px, 4vw, 48px); color: #0f172a; background: rgb(255 255 255 / 94%); border: 1px solid rgb(219 234 254 / 92%); border-radius: 22px; box-shadow: 0 36px 100px rgb(37 99 235 / 18%); backdrop-filter: blur(18px); }
.panel-number { position: absolute; top: 19px; right: 22px; font: 700 8px/1 monospace; letter-spacing: .1em; color: #b0b6c0; }
.panel-heading { display: flex; gap: 14px; align-items: center; margin: 10px 0 28px; }
.panel-icon { display: grid; width: 46px; height: 46px; color: #fff; background: linear-gradient(145deg, #2563eb, #38bdf8); border-radius: 13px; box-shadow: 0 9px 22px rgb(37 99 235 / 24%); place-items: center; }
.panel-heading div { display: grid; gap: 5px; }
.panel-heading h2 { margin: 0; font-size: 24px; letter-spacing: -.025em; }
.panel-heading p { margin: 0; font-size: 12px; color: #8a93a0; }
.access-note { display: flex; gap: 8px; align-items: center; padding: 10px 12px; margin-bottom: 23px; font-size: 10px; color: #475569; background: #eff6ff; border: 1px solid #dbeafe; border-radius: 10px; }
.access-note span { flex: 1; }
.access-note b { font-size: 9px; color: #059669; }
.login-error { margin-bottom: 18px; }
.login-panel :deep(.el-form-item) { margin-bottom: 19px; }
.login-panel :deep(.el-form-item__label) { padding-bottom: 7px; font-size: 11px; font-weight: 650; color: #566273; }
.login-panel :deep(.el-input__wrapper) { padding: 2px 13px; background: #f7f8fa; border-radius: 10px; box-shadow: inset 0 0 0 1px #e3e7ed; }
.login-panel :deep(.el-input__wrapper.is-focus) { background: #fff; box-shadow: inset 0 0 0 1px #60a5fa, 0 0 0 4px rgb(37 99 235 / 9%); }
.submit { display: flex; width: 100%; height: 46px; margin-top: 4px; background: linear-gradient(110deg, #2563eb, #38bdf8); border: 0; border-radius: 11px; box-shadow: 0 10px 25px rgb(37 99 235 / 25%); }
.submit :deep(span) { display: flex; gap: 8px; align-items: center; }
.panel-footer { display: flex; gap: 18px; justify-content: center; padding-top: 22px; margin-top: 23px; font-size: 9px; color: #9aa2ae; border-top: 1px solid #edf0f3; }
.panel-footer span { display: flex; gap: 5px; align-items: center; }
.copyright { margin: 18px 0 0; font: 700 8px/1 monospace; letter-spacing: .13em; color: #7c91af; text-align: center; }
.noise { opacity: .1; }

@keyframes pulse { 50% { opacity: .35; } }

@media (width <= 1050px) {
  .login-main { grid-template-columns: 1fr; width: min(850px, calc(100% - 44px)); }
  .story-stage { text-align: center; }
  .stage-kicker, .feature-strip { justify-content: center; }
  .story-stage > p, .stage-visual { margin-right: auto; margin-left: auto; }
  .login-panel-wrap { width: min(100%, 520px); margin: 0 auto; }
}

@media (width <= 620px) {
  .login-header { height: 66px; padding: 0 18px; }
  .system-state { display: none; }
  .login-main { width: min(100% - 26px, 850px); padding-top: 36px; }
  .story-stage > h1 { font-size: 42px; }
  .story-stage > p { font-size: 13px; }
  .stage-visual { height: 240px; }
  .viewfinder { right: 20px; }
  .floating-card { width: 190px; }
  .card-script { right: -5px; }
  .card-assets { display: none; }
  .feature-strip { align-items: flex-start; }
  .feature-strip > i { display: none; }
  .feature-strip small { display: none; }
  .login-panel { padding: 30px 23px; }
}
</style>
