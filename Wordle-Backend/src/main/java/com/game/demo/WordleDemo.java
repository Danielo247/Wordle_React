import java.util.Scanner;

public class WordleDemo {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        String palabra = "barbacoa";
        palabra = palabra.toUpperCase();
        String jugador;
        int x = 0;

        System.out.println("Bienvenido a Wordle");
        System.out.println("Color verde si has acertado la posicion");
        System.out.println("Color amarillo si has acertado la letra");
        System.out.println("Color blanco si no has acertado");

        char[] wordle = new char[palabra.length()];
        boolean[] wordleaux = new boolean[palabra.length()];
        boolean[] wordleauxverde = new boolean[palabra.length()];
        char[] amarilloaux = new char[palabra.length()];
        System.out.println("Introduce la palabra de " + palabra.length() + " letras");
        do {
            do {

                jugador = input.nextLine();
                if(jugador.length() < palabra.length()){
                    System.out.println("Tienes que introducir " + palabra.length() + " caracteres");
                }else {
                    jugador = jugador.toUpperCase();
                    rellenar(wordle, amarilloaux, palabra, jugador);
                    rellenar2(wordleaux, wordleauxverde);
                }
            } while (jugador.length() != palabra.length());
            comprobar(wordle,jugador, wordleaux, amarilloaux, wordleauxverde);

            x++;
        }while(x != 5 && !jugador.equals(palabra));
        if(x == 5 && !jugador.equals(palabra)){
            System.out.println("Has perdido");}
        else System.out.println("Has ganado!");
    }
    static void rellenar(char[] wordle, char[] amarilloaux ,String palabra, String usuario) {

        for (int i = 0 ; i < wordle.length; i++){
            for(int j = 0 ; j < wordle.length ; j++){
                wordle [j] = palabra.charAt(j);
                amarilloaux[j] = usuario.charAt(j);
            }
        }
    }
    static void rellenar2(boolean[] wordleaux, boolean[] wordleauxverde) {

        for (int i = 0 ; i < wordleaux.length; i++){
            for(int j = 0 ; j < wordleaux.length ; j++){
                wordleaux [j] = false;
                wordleauxverde [j] = false;
            }
        }
    }
    static void comprobar (char [] wordle, String jugador, boolean [] wordleaux, char [] amarilloaux, boolean [] wordleauxverde) {
        String RESET = "\u001B[0m";
        String GREEN = "\u001B[32m";
        String YELLOW = "\u001B[33m";

        for (int j = 0; j < wordle.length; j++) {
            if (jugador.charAt(j) == wordle[j]) {
                amarilloaux[j] = '-';
                wordle[j] = '-';
                wordleauxverde [j] = true;
            }
        }
        int buscar;
        for (buscar = 0; buscar < wordle.length; buscar++) {
            for(int j = 0;j<wordle.length;j++){
            if (amarilloaux[buscar] == wordle[j]) {
                wordleaux[buscar] = true;
                wordle[j] = '-';
                j = wordle.length;
            }
            }
        }
        for(int j = 0;j<wordle.length;j++){
        pintar(jugador, wordleaux, j, wordleauxverde);}
    }
    static void pintar (String jugador, boolean [] wordleaux, int j, boolean [] wordleauxverde){
        String RESET = "\u001B[0m";
        String GREEN = "\u001B[32m";
        String YELLOW = "\u001B[33m";

        int buscar;
            if (wordleauxverde[j]) {
                System.out.print("[" + GREEN + jugador.charAt(j) + RESET + "]" + " ");
            }
            else if (wordleaux[j]){
                System.out.print("[" + YELLOW + jugador.charAt(j) + RESET + "]" + " ");
            } else {
                System.out.print("[" + jugador.charAt(j) + "]" + " ");
            }
        }
}