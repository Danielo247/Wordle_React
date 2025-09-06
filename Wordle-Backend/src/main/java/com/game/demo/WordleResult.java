package com.game.demo;

public class WordleResult {
    private String player;
    private boolean[] green;
    private boolean[] yellow;

    public WordleResult(String player, boolean[] green, boolean[] yellow) {
        this.player = player;
        this.green = green;
        this.yellow = yellow;
    }

    public String getPlayer() {
        return player;
    }

    public boolean[] getGreen() {
        return green;
    }

    public boolean[] getyellow() {
        return yellow;
    }
}
