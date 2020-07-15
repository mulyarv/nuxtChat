<template>
  <div class="bg">
    <button class="btn btn-danger" href="#" role="button" @click.prevent="logout">Покинуть чат</button>
    <div class="chat-wrap">
      <div class="chat">
        <div class="card bg-light mb-3" v-for="message of messages" :key="message.userId">
          <div class="card-header">
            {{message.userName}}
            <span class="mess-time">{{message.time}}</span>
          </div>
          <div class="card-body">
            <p class="card-text">{{message.message}}</p>
          </div>
        </div>
      </div>

      <form @submit.prevent="onSubmit">
        <textarea
          class="form-control"
          v-model="mess"
          v-on:keyup.enter="onSubmit"
          placeholder="Введите сообщение"
        ></textarea>
        <button type="submit" class="btn btn-primary">Отправить</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  async fetch({ store }) {
    if (store.getters["messages/messages"].length === 0) {
      await store.dispatch("messages/fetch");
    }
  },

  beforeMount() {
    if (!localStorage.getItem("authName")) {
      this.$router.push("/");
    }
  },
  computed: {
    messages() {
      return this.$store.getters["messages/messages"];
    }
  },
  mounted() {
    this.scroll();
  },
  data() {
    return {
      mess: ""
    };
  },

  methods: {
    onSubmit() {
      this.$axios.setHeader("Content-Type", "application/json", ["post"]);
      const message = {
        userId: Date.now(),
        userName: JSON.parse(localStorage.getItem("authName")),
        message: this.mess,
        time: new Date().toLocaleDateString("ru", {
          hour: "numeric",
          minute: "numeric"
        })
      };
      this.mess = "";

      this.$axios
        .$post("/api/messages", JSON.stringify(message))
        .then(r => this.$store.dispatch("messages/fetch"))
        .then(v => this.scroll())
        .catch(error => console.log(error));
    },
    scroll() {
      document.querySelector(".chat").scrollTo(0, Math.pow(10, 10));
    },
    logout() {
      localStorage.clear();
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.bg {
  position: relative;
  height: 100%;
  width: 100%;
  padding-top: 20px;
  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.btn.btn-danger {
  position: absolute;
  margin-top: 20px;
  right: 30px;
  top: 0;
  z-index: 999;
}
.chat-wrap {
  position: relative;
  max-width: 700px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.btn {
  margin-top: 0.5rem;
  width: 130px;
  height: 50px;
}
.chat {
  min-height: 40%;
  max-height: 70%;
  padding: 0px 20px;
  width: 80%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
.card {
  min-width: 50%;
  max-width: 300px;
  margin: 20px 0;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  padding: 0px 15px;
  font-weight: bold;
  color: #333;
}
.card-body {
  min-height: 40px;
  height: auto;
  padding: 5px;
}
.card-header span {
  font-weight: normal;
  color: #777;
}
form {
  display: block;
  width: 80%;
  margin: 0 auto;
  min-height: 25%;
  max-height: 25%;
}
textarea {
  height: 80px;
}
</style>