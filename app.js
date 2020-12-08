const app = Vue.createApp({
  data() {
    return {
      signIn: false,
      signUp: true,
      signInUsernameVTxt: false,
      signInPasswordVTxt: false,
      signUpUsernameVTxt: false,
      signUpEmailVTxt: false,
      signUpRpEmailVTxt: false,
      signUpPasswordVTxt: false,
      signUpRpPasswordVTxt: false,
      username: "",
      email: "",
      repeatEmail: "",
      password: "",
      repeatPassword: "",
      users: [
        {
          username: "Chibuzor",
          password: "chibuzor2020",
          email: "iwuagwuchibuzor@gmail.com",
        },
        {
          username: "Tochukwu",
          password: "tochi2020",
          email: "iwuagwutochukwu@gmail.com",
        },
      ],
      patterns: {
        username: /^[a-z\d]{5,12}$/i,
        password: /^[\w@]{8,20}$/,
        email: /^([a-z\d\.-]+)@([a-z\d]+).([a-z]{2,8})(\.[a-z]{2,8})?$/,
      },
    };
  },

  methods: {
    fetchUsers(url) {
      return fetch(url).then((response) => response.json());
    },

    async getData() {
      try {
        const responseData = await this.fetchUsers("users.json");
        return responseData;
      } catch (error) {
        console.log(error);
      }
    },

    toggleFormNav(event) {
      if (event.target.textContent === "Sign in") {
        this.signIn = true;
        this.signUp = false;
      } else if (event.target.textContent === "Sign up") {
        this.signIn = false;
        this.signUp = true;
      }
    },

    signInValidation() {
      // Gets the user details with the user enterd inputs
      const getUserDetails = this.users.find(
        (user) =>
          user.username === this.username || user.password === this.password
      );

      // if the entered inputs matches a user
      // if (getUserDetails) {
      //   // if the user entered a wrong username
      //   if (this.username !== getUserDetails.username) {
      //     this.signInUsernameVTxt = true;
      //     return;
      //   } else if (this.password !== getUserDetails.password) {
      //     this.signInPasswordVTxt = true;
      //     return;
      //   } else {
      //     // Return true and set the validation text to hidden
      //     this.signInUsernameVTxt = false;
      //     this.signInPasswordVTxt = false;
      //   }
      // } else {
      //   this.signInUsernameVTxt = true;
      //   this.signInPasswordVTxt = true;
      // }
      if (getUserDetails) {
        if (this.username !== getUserDetails.username) {
          this.signInUsernameVTxt = true;
          return;
        } else {
          this.signInUsernameVTxt = false;
        }
        if (this.password !== getUserDetails.password) {
          this.signInPasswordVTxt = true;
          return;
        } else {
          this.signInPasswordVTxt = false;
        }
        if (
          this.password === getUserDetails.password &&
          this.username === getUserDetails.username
        ) {
          this.signInUsernameVTxt = false;
          this.signInPasswordVTxt = false;
        }
      } else {
        this.signInUsernameVTxt = true;
        this.signInPasswordVTxt = true;
        return;
      }
    },

    signUpValidation() {},

    validateSignUpInput(event) {
      if (
        this.patterns[event.target.attributes.name.value].test(
          event.target.value
        )
      ) {
        event.target.nextElementSibling.classList.remove("invalid");
        event.target.nextElementSibling.classList.add("valid");
        this[event.target.id] = false;
      } else {
        event.target.nextElementSibling.classList.add("invalid");
        this[event.target.id] = true;
      }
    },

    showInvalidationText(arg) {
      return (arg = true);
    },
  },

  computed: {
    currentFormNav1() {
      return { active: this.signUp };
    },
    currentFormNav2() {
      return { active: this.signIn };
    },
  },
});

app.mount("#app");
