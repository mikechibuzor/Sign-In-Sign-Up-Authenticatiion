const app = Vue.createApp({
  mounted() {
    // this.getData();
  },
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
      "repeat-email": "",
      password: "",
      "repeat-password": "",
      allSignUpInputsValidity: {
        email: false,
        username: false,
        password: false,
        "repeat-email": false,
        "repeat-password": false,
      },
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
        "repeat-email": /^([a-z\d\.-]+)@([a-z\d]+).([a-z]{2,8})(\.[a-z]{2,8})?$/,
        "repeat-password": /^[\w@]{8,20}$/,
      },
    };
  },

  methods: {
    handleRequest(url, arg = "") {
      if (arg) {
        return fetch(url, {
          method: arg.method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(arg.body),
        });
      } else {
        return fetch(url).then((response) => response.json());
      }
    },

    async getData() {
      try {
        const response = await this.handleRequest(
          "https://users-9cc57-default-rtdb.firebaseio.com/users.json"
        );
        const responseData = await response;

        // Save to browser local storage for easy access and of course, boost performance
        localStorage.setItem(
          "users",
          JSON.stringify(responseData["-MOiEKK24W7rbjMAGC0J"].users)
        );
      } catch (error) {
        console.log(error);
      }
    },

    toggleFormNav(event) {
      if (event.target.textContent === "Sign in") {
        this.signIn = true;
        this.signUp = false;
        this.username = "";
        this.password = "";
      } else if (event.target.textContent === "Sign up") {
        this.signIn = false;
        this.signUp = true;
        this.username = "";
        this.password = "";
        this["repeat-email"] = "";
        this["repeat-password"] = "";
      }
    },

    signInValidation() {
      // Gets the user details with the user enterd inputs
      const getUserDetails = this.users.find(
        (user) =>
          user.username === this.username || user.password === this.password
      );
      // if the entered inputs matches a user
      if (getUserDetails) {
        // if the user entered a wrong username
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
          alert("Successfully signed in");
        }
      } else {
        this.signInUsernameVTxt = true;
        this.signInPasswordVTxt = true;
        return;
      }
    },

    signUpValidation() {
      if (
        this.allSignUpInputsValidity.email === true &&
        this.allSignUpInputsValidity.username === true &&
        this.allSignUpInputsValidity.password === true &&
        this.allSignUpInputsValidity["repeat-email"] === true &&
        this.allSignUpInputsValidity["repeat-password"] === true
      ) {
        alert("Successfully Signed up");
      }
    },

    validateSignUpInput(event) {
      // if it passes the regex condtion of a valid input and entered input doesnt previously exist
      if (
        this.patterns[event.target.attributes.name.value].test(
          event.target.value
        ) &&
        this.checkEnteredInput(event)
      ) {
        event.target.nextElementSibling.classList.remove("invalid");
        event.target.nextElementSibling.classList.add("valid");
        this.allSignUpInputsValidity[event.target.attributes.name.value] = true;
        // code below helps in toggling the validationText
        this[event.target.id] = false;
      } else {
        event.target.nextElementSibling.classList.add("invalid");
        this.allSignUpInputsValidity[
          event.target.attributes.name.value
        ] = false;
        // code below helps in toggling the validationText
        this[event.target.id] = true;
      }
    },

    checkEnteredInput(event) {
      // if it is a repeat type of input
      if (event.target.className === "repeat") {
        // used a ternay operator to help me ascertain what the original input i will use to compare with will be
        const whichInput =
          event.target.attributes.name.value === "repeat-email"
            ? "email"
            : "password";
        // check the entered repeat-input to see if it matches the original
        if (event.target.value === this[whichInput]) {
          return true;
        } else {
          return false;
        }
      } else {
        // not a repeat type of input
        const matchedInput = this.users.find(
          (user) =>
            user[event.target.attributes.name.value] === event.target.value
        );
        return !matchedInput;
      }
    },

    updateUsersToServer() {
      const oldUsersData = JSON.parse(localStorage.getItem("users"));
      const newUserData = {
        username: this.username,
        password: this.password,
        email: this.email,
      };
      const updatedUsersData = [...oldUsersData, newUserData];

      const postObject = {
        method: "POST",
        body: updatedUsersData,
      };

      this.handleRequest(url, postObject);
    },

    showInvalidationText(arg) {
      return (arg = true);
    },

    getUsersFromBrowserStorage() {
      return localStorage.getItem("books")
        ? []
        : JSON.parse(localStorage.getItem("books"));
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
