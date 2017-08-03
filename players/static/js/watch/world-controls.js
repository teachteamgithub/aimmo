// World Manipulation
const CONTROLS = Object.create({
    init: function (world, viewer) {
        this.world = world;
        this.viewer = viewer;
    },
    initialiseWorld: function (width, height, worldLayout, minX, minY, maxX, maxY) {
        this.world.width = width;
        this.world.height = height;
        this.world.layout = worldLayout;
        this.world.minX = minX;
        this.world.minY = minY;
        this.world.maxX = maxX;
        this.world.maxY = maxY;

        this.viewer.reDrawWorldLayout();
    },
    setState: function (players, mapFeatures) {
        // Create players.
        for (var playerToCreate in players["create"]) {
            if (players["create"].hasOwnProperty(playerToCreate)) {
                if (this.world.players === null) {
                    this.world.players = {};
                }
                this.world.players.push(playerToCreate);
            }
        }

        // Delete players.
        for (var playerToDelete in players["delete"]) {
            if (players["delete"].hasOwnProperty(playerToDelete)) {
                var playerToDeleteIndex = this.world.players.indexOf(playerToDelete);
                if (playerToDeleteIndex !== -1) {
                    this.world.players.splice(playerToDeleteIndex, 1);
                }
            }
        }

        // Update players.
        for (var playerToUpdate in players["update"]) {
            if (players["update"].hasOwnProperty(playerToUpdate)) {
                var playerToUpdateIndex = this.world.players.indexOf(playerToUpdate);
                if (playerToUpdateIndex !== -1) {
                    this.world.players[playerToUpdateIndex] = playerToUpdateIndex;
                }
            }
        }

        //this.world.scoreLocations = scoreLocations; //TODO: use instead of relying on world.layout (and remove score from there)
        //this.world.pickups = pickups;

        this.viewer.reDrawState();
    }
});

// Updates.
function worldUpdate(data) {
    CONTROLS.processUpdate(data["players"], data["map_features"]);
}

// Initialisation.
function worldInit(data) {
    CONTROLS.initialiseWorld(data.width, data.height, data.layout, data.minX, data.minY, data.maxX, data.maxY);
}

$(document).ready(function(){
    var world = {};
    world.players = {};
    VIEWER.init(document.getElementById("watch-world-canvas"), world, APPEARANCE);
    CONTROLS.init(world, VIEWER);

    if (ACTIVE) {
        var socket = io.connect(GAME_URL_BASE, { path: GAME_URL_PATH });
<<<<<<< HEAD
        socket.on('world-init'), funciton(msg) {
            worldInit(msg);
=======
        socket.on('world-init'), function() {
            worldInit();
>>>>>>> e57334b... Create / Delete / Update players using the new update-based API.
        }

        socket.on('world-update', function(msg) {
            worldUpdate(msg);
        });
    } /*else {
        refreshState(STATIC_DATA);
    }*/
});
