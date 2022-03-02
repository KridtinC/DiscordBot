var generateOnoiOrkList = (size: number): string[] => {
    var onoiList = [];
    for (let i = 0; i < size; i++) {
        if (i % 2 == 0) {
            onoiList.push("**BLACK** ⚫");
        }
        else {
            onoiList.push("**WHITE** ⚪");
        }
    }

    return onoiList
}

var generateOnoiRoleList = (size: number): string[] => {
    var onoiList = [];
    for (let i = 0; i < size; i++) {
        if (i % 2 == 0 && i % 3 != 0) {
            onoiList.push("**DPS** 🗽");
        }
        else if (i % 3 == 0) {
            onoiList.push("**SUPPORT** 🥗");
        }
        else {
            onoiList.push("**TANK** 🏯");
        }
    }

    return onoiList
}

export {
    generateOnoiOrkList,
    generateOnoiRoleList
}