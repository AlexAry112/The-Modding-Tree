// --- CREATION LAYER ("c") ---
addLayer("c", {
    name: "Creation",
    symbol: "C",
    position: 0,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10),
    resource: "particle creation",
    baseResource: "particles",
    baseAmount() { return player.points },
    type: "normal",
    exponent: 0.4,

    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('c', 13)) mult = mult.times(upgradeEffect('c', 13))
        if (hasAchievement('a', 13)) mult = mult.times(1.5) // reward from achievement
        return mult
    },

    gainExp() {
        return new Decimal(1)
    },

    row: 0,
    hotkeys: [
        { key: "C", description: "C: Reset for particle creation", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],

    upgrades: {
        11: {
            title: "Double creation!",
            description: "Double your point gain.",
            cost: new Decimal(2),
        },
        12: {
            title: "Increased manufacturing power!",
            description: "Get more particles based on total particle creations.",
            cost: new Decimal(8),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
        },
        13: {
            title: "Progress acceleration!",
            description: "Get more particle creations based on total particles.",
            cost: new Decimal(10),
            effect() {
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
        },
    },

    tabFormat: [
        "main-display",
        "prestige-button",
        "resource-display",
        ["blank", "25px"],
        "upgrades"
    ],

    layerShown() { return true }
})

// --- ACHIEVEMENTS LAYER ("a") ---
addLayer("a", {
    name: "Achievements",
    symbol: "🏆",
    row: "side",
    color: "#FFD700",
    startData() { return { unlocked: true } },
    layerShown() { return true },

    achievements: {
    rows: 2,
    cols: 3,

    11: {
        name: "First Creation",
        done() { return player.c.points.gte(1) },
        tooltip: "Earn 1 particle creation.",
        style() {
            return {
                'background-color': this.done() ? '' : '#a33',
                'border-color': this.done() ? '' : '#800',
            }
        }
    },
    12: {
        name: "Getting Started",
        done() { return player.points.gte(10) },
        tooltip: "Reach 10 particles.",
        style() {
            return {
                'background-color': this.done() ? '' : '#a33',
                'border-color': this.done() ? '' : '#800',
            }
        }
    },
    13: {
        name: "Creative Genius",
        done() { return player.c.points.gte(100) },
        tooltip: "Earn 100 particle creations.<br>Reward: x1.5 particle creation gain.",
        style() {
            return {
                'background-color': this.done() ? '' : '#a33',
                'border-color': this.done() ? '' : '#800',
            }
        }
    },
    21: {
        name: "Builder",
        done() { return hasUpgrade('c', 11) },
        tooltip: "Buy your first upgrade.",
        style() {
            return {
                'background-color': this.done() ? '' : '#a33',
                'border-color': this.done() ? '' : '#800',
            }
        }
    },
    22: {
        name: "Upgrader Supreme",
        done() { return hasUpgrade('c', 13) },
        tooltip: "Buy all three upgrades.",
        style() {
            return {
                'background-color': this.done() ? '' : '#a33',
                'border-color': this.done() ? '' : '#800',
            }
        }
    },
    23: {
        name: "Efficiency",
        done() { return player.points.gte(1e5) },
        tooltip: "Reach 100,000 particles.",
        style() {
            return {
                'background-color': this.done() ? '' : '#a33',
                'border-color': this.done() ? '' : '#800',
            }
        }
    }
}

})
