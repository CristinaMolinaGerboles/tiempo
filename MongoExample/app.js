Vue.createApp({
    data() {
        return {
            newPlayerName: "",
            newPlayerPosition: "",
            newPlayerDorsal: "",
            players: []
        };
    },

    methods: {
        addPlayer() {
            fetch("http://localhost:8080/players", {
                method: "POST",
                body: JSON.stringify({
                  name: this.newPlayerName,
                  position: this.newPlayerPosition,
                  dorsal: this.newPlayerDorsal,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              }).then(() => {
                this.loadPlayersFromApi();
              });
        },

        loadPlayersFromApi() {
            fetch("http://localhost:8080/players")
                .then((response) => response.json())
                .then((players) => {
                    console.log(players);
                    this.players = players;
                });
        }
    },

    created() {
        this.loadPlayersFromApi();
    }
}).mount("#app");
