/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/*
 * instellingen om foutcontrole van je code beter te maken 
 */
///<reference path="p5.global-mode.d.ts" />
"use strict"

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */
const SPELEN = 1;
const GAMEOVER = 2;
const UITLEG = 3;
var spelStatus = UITLEG;

var spelerAX = 600; // x-positie van speler 1
var spelerAY = 300; // y-positie van speler 1
var spelerBX = 600; // x-positie van speler 2
var spelerBY = 400; // y-positie van speler 
var speedA = 4;     // snelheid van speler 1
var speedB = 2;     // snelheid van speler 2
var punten = 0;    // aantal punten dat het team heeft behaalds
var crash = false; // of de speler crasht
var potholeX = 1280;
var potholeY = Math.random()*700;
var autoX = 1280;
var autoY = Math.random()*700;

/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function() {
  // speler 1
  if (keyIsDown(LEFT_ARROW)) 
    {spelerAX = spelerAX - speedA; }
  if (keyIsDown(RIGHT_ARROW))
    {spelerAX = spelerAX + speedA;}
  if (keyIsDown(UP_ARROW))
    {spelerAY = spelerAY - speedA}
  if (keyIsDown(DOWN_ARROW))
    {spelerAY = spelerAY + speedA}
  // speler 2
  if (keyIsDown(65)) 
    {spelerBX = spelerBX - speedB; }
  if (keyIsDown(68))
    {spelerBX = spelerBX + speedB;}
  if (keyIsDown(87))
    {spelerBY = spelerBY - speedB}
  if (keyIsDown(83))
    {spelerBY = spelerBY + speedB}
  // pothole
  potholeX = potholeX - 10;
  if (potholeX < 0)
  {potholeX = 1280; potholeY = Math.random()*700;}
  // auto
  autoX = autoX - 3;
  if (autoX < -150)
  {autoX = 1280; autoY = Math.random()*700;}

};

/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function() {
  // botsing speler 1 tegen speler 2
if (  spelerAX - spelerBX <125 &&
      spelerAX - spelerBX >-125 &&
      spelerAY - spelerBY <45 &&
      spelerAY - spelerBY >-45 )
  {crash = true;
    console.log ("Botsing"); }
else {crash = false;
        console.log ("Geen botsing")
     }
 
  // botsing spelers tegen schermrand
if (spelerAX < 75) {crash = true;}
if (spelerAX > 1200) {crash = true;}
if (spelerAY < 25) {crash = true;}
if (spelerAY > 700) {crash = true;}
if (spelerBX < 50) {crash = true;}
if (spelerBX > 1227) {crash = true;}
if (spelerBY < 25) {crash = true;}
if (spelerBY > 700) {crash = true;}
  
  // botsing pothole tegen spelers
  if (spelerAX - potholeX <100 &&
      spelerAX - potholeX >-75 &&
      spelerAY - potholeY <125 &&
      spelerAY - potholeY >-25)
  {crash = true;}
  if (spelerBX - potholeX <75 &&
      spelerBX - potholeX >-50 &&
      spelerBY - potholeY <117 &&
      spelerBY - potholeY >-17)
  {crash = true;}
  // botsing auto tegen spelers
  if ((spelerAX - autoX <150 &&
       spelerAX - autoX >-150 &&
       spelerAY - autoY <50 &&
       spelerAY - autoY >-50))
  {crash = true;}
  if (spelerBX - autoX <127 &&
      spelerBX - autoX >-127 &&
      spelerBY - autoY <43 &&
      spelerBY - autoY >-43)
  {crash = true;}
  // update punten en health

};
/**
 * Tekent spelscherm
 */
var tekenAlles = function() {
  // achtergrond
  background("green");

  // speler 1
  fill("#4000FF");
  rect(spelerAX - 75, spelerAY - 25, 150, 50);
  // speler 2
  fill("#000000");
  rect(spelerBX - 50, spelerBY - 17, 100, 35);

  // pothole
  fill("Red");
  rect(potholeX, potholeY, 25, 100);
  // auto
  fill("Purple");
  rect(autoX - 75, autoY - 25, 150, 50);
  
  // punten 
  fill("white");
  textSize(30);
  text("Punten: " + punten, 10, 30)
  punten = punten + 1;
};

/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background("green");
}

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  if (spelStatus === SPELEN) {
    beweegAlles();
    verwerkBotsing();
    tekenAlles();
    if (crash === true) {
      spelStatus = GAMEOVER;
    }
  }
  if (spelStatus === GAMEOVER) {
    background("red");
    textSize(100);
    fill("white"); 
    text("Crashed!!" ,400, 300);
    text("Press enter to restart", 200, 500);
    console.log ("game over")
    // teken game-over scherm
  if (keyIsDown(ENTER)) {
    spelStatus = UITLEG;
    }
  }
  if (punten >= 5000) {
    background("green");
    textSize(100);
    fill("white"); 
    text("You win!!" ,400, 300);
    text("Press enter to restart", 200, 500);
    console.log ("game over")
    // teken game-over scherm
  if (keyIsDown(ENTER)) {
    spelStatus = UITLEG;
    }
  }
  if (spelStatus === UITLEG) {
    background("#701010");
    textSize(60);
    fill("white");
    text("-Player 1 moves with: w, a, s, d" ,200 ,100)
    text("-Player 2 moves with: up, left, down, right" ,100 ,200)
    text("-You crash if the car touches the other car," ,100 ,300)
    text("the edge of the screen or any obstacle", 125 ,400)
    text("-You win if the score goes above 5000", 100 ,500)
    textSize(100);
    text("Press shift to start" ,250 ,650)
  }
  if (spelStatus === UITLEG && keyIsDown(16)) {
    spelerAX = 600;
    spelerAY = 300;
    spelerBX = 600;
    spelerBY = 400;
    punten = 0;
    potholeX = 1280;
    autoX = 1280;
    spelStatus = SPELEN;
  }
}
