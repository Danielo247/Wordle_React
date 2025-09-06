package com.game.demo;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wordle")
@CrossOrigin(origins = "http://localhost:5173")
public class WordleController {

    private final WordleService wordleService;

    public WordleController(WordleService wordleService) {
        this.wordleService = wordleService;
    }

    @PostMapping("/tr")
    public WordleResult tr(@RequestParam String tr) {
        return wordleService.play(tr);
    }

    @PostMapping("/prepare")
    public int lon(@RequestParam(required = false, defaultValue = "es") String lang) {
        wordleService.updateWord(lang);
        return wordleService.len();
    }

    @GetMapping("/solution")
    public String getSolution() {
        return wordleService.getWord();
    }

}