<template>
  <div class="fixed">
    <form class="log-form" @submit.prevent="onSubmit">
      <div class="alert alert-danger" role="alert">Имя должно быть не меньше 3 букв</div>
      <input
        class="form-control form-control-lg"
        type="text"
        placeholder="Введите ваше имя"
        v-model="name"
        required
      />
      <button type="submit" class="btn btn-primary btn-lg">Войти</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: ""
    };
  },
  methods: {
    onSubmit() {
      if (process.client && this.name.trim().length > 3) {
        localStorage.setItem("authName", JSON.stringify(this.name));
        this.name = "";
        this.$router.push("/chat");
      } else {
        document.querySelector(".alert-danger").style.display = "block";
        this.name = "";
      }
    }
  }
};
</script>

<style scoped>
.fixed {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.log-form {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  min-width: 400px;
}
.alert-danger {
  display: none;
  position: absolute;
  top: -70px;
  width: 100%;
}
</style>