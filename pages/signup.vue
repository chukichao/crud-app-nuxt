<template>
  <main>
    <h1 id="heading">Registration Page</h1>

    <form class="form" @submit.prevent="registerAccount">
      <div class="form-main">
        <label
          >Name:
          <UIInput
            v-model.trim="user.username"
            autocomplete="username"
            :class="required"
          />
        </label>

        <label
          >Age:
          <UIInput v-model.number="user.age" type="number" :class="required" />
        </label>

        <label
          >Password:
          <UIInput
            v-model.trim="user.password"
            type="password"
            autocomplete="new-password"
            :class="(required, confirm)"
          />
        </label>

        <label
          >Confirm Password:
          <UIInput
            v-model.trim="confirmPassword"
            type="password"
            autocomplete="new-password"
            :class="(required, confirm)"
          /><
        </label>

        <div class="form-rules">
          <label
            ><input
              v-model="user.isAgreeWithRules"
              :class="required"
              type="checkbox"
            />
            I have read the privacy policy (required)</label
          >
        </div>

        <small v-if="errorFeedback" class="error-feedback">{{
          errorFeedback
        }}</small>
      </div>

      <hr style="border-color: bisque" />

      <div class="form-country">
        <label for="country">Country:</label>
        <div>
          <UISelect
            id="country"
            v-model="user.country"
            :options="countryOptions"
          ></UISelect>
        </div>
      </div>

      <label
        >Date of birth:
        <UIInput v-model="user.birthday" type="date" />
      </label>

      <div class="form-gender">
        Gender:
        <div>
          <label>
            <input v-model="user.gender" type="radio" value="male" />
            Male</label
          >
        </div>

        <div>
          <label
            ><input v-model="user.gender" type="radio" value="female" />
            Female</label
          >
        </div>
      </div>

      <div class="form-skills">
        Skills:
        <div>
          <label
            ><input v-model="user.skills" type="checkbox" value="html" />
            HTML</label
          >
        </div>

        <div>
          <label
            ><input v-model="user.skills" type="checkbox" value="css" />
            CSS</label
          >
        </div>

        <div>
          <label
            ><input v-model="user.skills" type="checkbox" value="js" />
            JS</label
          >
        </div>
      </div>

      <UIButton>Sign up</UIButton>
    </form>
  </main>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user.ts';

const userStore = useUserStore();

const router = useRouter();

const user = reactive({
  username: '',
  age: 0,
  password: '',
  country: '',
  birthday: '',
  gender: 'male',
  skills: [],
  isAgreeWithRules: false,
});

const confirmPassword = ref(null);

const errors = reactive({
  requiredError: false,
  confirmError: false,
});

const errorFeedback = ref('');

const countryOptions = reactive([
  { title: 'Armenia', value: 'armenia' },
  { title: 'Belarus', value: 'belarus' },
  { title: 'Kazakhstan', value: 'kazakhstan' },
  { title: 'Russia', value: 'russia' },
]);

const registerAccount = () => {
  if (validate()) {
    const authData = {
      username: user.username,
      token: String(Math.random()).slice(2),
    };

    const newUser = {
      ...user,
      id: Number(String(Math.random()).slice(2)),
    };

    userStore.login(authData, newUser);
    router.push('/');
  }
};

const validate = () => {
  if (!user.username || !user.password || !user.age || !user.isAgreeWithRules) {
    errors.requiredError = true;
    errorFeedback.value = 'required field';
    return false;
  }
  errors.requiredError = false;

  if (user.password !== confirmPassword.value) {
    errors.confirmError = true;
    errorFeedback.value = 'passwords must match';
    return false;
  }
  errors.confirmError = false;

  errorFeedback.value = '';

  return true;
};

const scrollToUp = () => {
  const heading = document.getElementById('heading');

  if (heading) {
    heading.scrollIntoView();
  }
};

const required = computed(() => {
  return errors.requiredError ? 'error-outline-required' : '';
});

const confirm = computed(() => {
  return errors.confirmError ? 'error-outline-confirm' : '';
});

watch(errors, () => {
  scrollToUp();
});
</script>

<style scoped lang="scss">
.form {
  input,
  button {
    width: 100%;
    padding: 0.8rem;

    cursor: pointer;
  }

  label {
    cursor: pointer;
  }

  button {
    margin-top: 1rem;

    &:hover {
      background: bisque;
    }
  }

  &-main {
    margin: 4rem auto;
  }

  &-country {
    margin: 2rem auto;

    select {
      width: 100%;
      padding: 0.5rem;
    }
  }

  &-gender,
  &-skills,
  &-rules {
    margin: 2rem auto;

    input {
      width: auto;
    }
  }

  input {
    &:focus {
      outline: 1px solid #333;
    }
  }
}

.error-outline-required,
.error-outline-confirm {
  outline: 1px solid red;
}

.error-feedback {
  color: red;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
    'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
</style>
