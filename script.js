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
var spelerBY = 400; // y-positie van speler 2
var health = 3;    // health van speler
var speed = 2;     // snelheid van speler
var crash = false; // of de speler crasht

/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function() {
  // speler

  // vijand

  // kogel
};

/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function() {
  // botsing speler tegen vijand
if (spelerAX - spelerBX <150 &&
      spelerAX - spelerBX >-150 &&
      spelerAY - spelerBY <50 &&
      spelerAY - spelerBY >-50)
  {crash = true;
    console.log ("Botsing"); }
else {crash = false;
        console.log ("Geen botsing")
     }
 
  // botsing kogel tegen vijand

  // update punten en health

};
/**
 * Tekent spelscherm
 */
var tekenAlles = function() {
  // achtergrond
  background ("green")
  // vijand
  fill("#000000");
  rect(spelerBX - 75, spelerBY - 25, 150, 50);

  if (keyIsDown(65)) 
    {spelerBX = spelerBX - speed; }
  if (keyIsDown(68))
    {spelerBX = spelerBX + speed;}
  if (keyIsDown(87))
    {spelerBY = spelerBY - speed}
  if (keyIsDown(83))
    {spelerBY = spelerBY + speed}
  // kogel

  // speler
  fill("#4000FF");
  rect(spelerAX - 75, spelerAY - 25, 150, 50);

  if (keyIsDown(LEFT_ARROW)) 
    {spelerAX = spelerAX - speed; }
  if (keyIsDown(RIGHT_ARROW))
    {spelerAX = spelerAX + speed;}
  if (keyIsDown(UP_ARROW))
    {spelerAY = spelerAY - speed}
  if (keyIsDown(DOWN_ARROW))
    {spelerAY = spelerAY + speed}
  
  // punten en health
  fill("white");
  textSize(30);
  text("Health: " + health, 10, 30)
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
  background('green');
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
  if (spelStatus === UITLEG) {
    background("#701010");
    textSize(100);
    fill("white");
    text("'Uitleg'" ,500 ,300)
    text("Press shift to start" ,250 ,600)
  }
  if (keyIsDown(16)) {
    spelerAX = 600;
    spelerAY = 300;
    spelerBX = 600;
    spelerBY = 400;
    spelStatus = SPELEN;
  }
}
