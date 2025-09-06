package com.game.demo;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.text.Normalizer;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
public class WordleService {

    private String word = "";
    private String oldWord = "";

    public int len(){

        return word.length();
    }

    public void updateWord(String lang) {
        List<String> wordList = lang.equals("en")
                ? WordleWords.ENGLISH_WORDS
                : WordleWords.SPANISH_WORDS;

        Random random = new Random();
        String candidate;

        do {
            candidate = wordList.get(random.nextInt(wordList.size()));
        } while (candidate.equals(oldWord));

        oldWord = word;
        word = candidate;
        System.out.println("New word: " + word);
    }

    public WordleResult play(String player) {
        player = player.toUpperCase();

        char[] wordle = word.toUpperCase().toCharArray();
        char[] yellowaux = player.toCharArray();
        boolean[] green = new boolean[word.length()];
        boolean[] yellow = new boolean[word.length()];

        getGreen(player, wordle, yellowaux, green);

        getYellow(wordle, yellowaux, yellow);

        return new WordleResult(player, green, yellow);
    }


    public void getGreen(String jugador, char[] wordle, char[] amarilloaux, boolean[] verdes) {
        for (int j = 0; j < wordle.length; j++) {
            if (jugador.charAt(j) == wordle[j]) {
                amarilloaux[j] = '-';
                wordle[j] = '-';
                verdes[j] = true;
            }
        }
    }

    public void getYellow(char[] palabra, char[] intentoAux, boolean[] amarillas) {
        for (int i = 0; i < intentoAux.length; i++) {
            if (intentoAux[i] == '-') continue;
            for (int j = 0; j < palabra.length; j++) {
                if (palabra[j] == '-') continue;
                if (intentoAux[i] == palabra[j]) {
                    amarillas[i] = true;
                    palabra[j] = '-';
                    break;
                }
            }
        }
    }

    public String getWord() {
        return word;
    }


}