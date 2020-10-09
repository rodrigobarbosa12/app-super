# Gerador de variação do plom
{
    expo build:android -t apk
    # expo build:android -t app-bundle // Para Google play

    expo build:ios -t simulator
    # expo build:ios -t archive // Para PlayStore

} || {

    echo "NÃO FOI POSSIVEL COMPILAR O APP!";

}