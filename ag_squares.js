"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 14
   Review Assignment

   Author: 
   Date:   
   
   Filename: ag_squares.js

*/

window.addEventListener("load", playPokerSquares);

function playPokerSquares() {
   var newCard = document.getElementById("newCard");
   var startButton = document.getElementById("startButton");
   var rowSumCells = document.querySelectorAll("table#grid th.rowsum");   
   var colSumCells = document.querySelectorAll("table#grid th.colsum"); 
   var cardImages = document.querySelectorAll("table#grid tr td img");
   var gameScore = document.getElementById("gameScore");
   var gameResult = document.getElementById("gameResult");
   
   

   startButton.addEventListener("click", function(){

     squareGame.gameTotal = 0;
     gameScore.value = "";
     gameResult.innerText = "";

     for (var i=0; i < rowSumCells.length; i++){
       rowSumCells[i].innerText = "";
     }

     for (var i=0; i < colSumCells.length; i++){
       colSumCells[i].innerText = "";
     }

     for (var i=0; i<cardImages.length; i++){
       cardImages[i].setAttribute('src', "ag_trans.gif");
     }

     var myDeck = new pokerDeck();
     myDeck.shuffle();

     var myStarterCard = new pokerCard();
     myStarterCard = myDeck.cards.shift();
     newCard.setAttribute('src', myStarterCard.cardImage());

      for (var i=0; i<cardImages.length; i++){
        cardImages[i].addEventListener("click", setImageToGrid);

      }

      function setImageToGrid(event){
        event.target.setAttribute("src", myStarterCard.cardImage());
        var rowNum = event.target.id.charAt(1);
        var colNum = event.target.id.charAt(2);
        squareGame.cardGrid[rowNum].insertCard(myStarterCard, colNum);
        event.target.removeEventListener("click", setImageToGrid);

        if (myDeck.cards.length > 27){
          myStarterCard = myDeck.cards.shift();
          newCard.setAttribute("src", myStarterCard.cardImage());
        }
        else{
          newCard.setAttribute("src", "ag_cardback3.png");
          for (var counter = 0; counter <= 4; counter++){
            var rowTotal = squareGame.calcRowPoints(counter);
            squareGame.gameTotal = squareGame.gameTotal + rowTotal;
            document.getElementById("row" + counter + "sum").innerText = rowTotal;
          }

          for (var counter = 0; counter<=4; counter++){
            var colTotal = squareGame.calcColumnPoints(counter);
            squareGame.gameTotal = squareGame.gameTotal + colTotal;
            document.getElementById("col" + counter + "sum").innerText = colTotal;
          }

          gameScore.value = squareGame.gameTotal;
          gameResult.innerText = squareGame.gameResult();
          
        }
      }


   });

}
                               

