$(function() {
  // Start by setting the state
  var startState = false;
  var activeTerminal = '#stick';
  var writeInterval;

  // Variables for setting up the problem
  var firstChoice;
  var hostReveal;
  var secondChoice;
  var winningDoor;
  
  // More variables to output the text
  var didSwitch;
  var wonLost;

  // Variables for counting
  var winCountStick = 0;
  var winCountSwitch = 0;
  var playCountStick = 0;
  var playCountSwitch = 0;
  
  $('#startSim').click(function() {
    // Change the text of the #startSim button from 'Start' to 'Stop' and back 
    $('#startSim').attr('value', function(index, attr) {
      return attr == 'Start' ? 'Stop' : 'Start';
    });
    // Switch between states
    startState = !startState;
    
    if (startState == true) {
      // Write to the active terminal...
      function writeToTerminal() {
        // Code to be executed for both terminals
        
        // Set parameters
        firstChoice = Math.floor(Math.random() * 3 + 1);
        winningDoor = Math.floor(Math.random() * 3 + 1);
        
        function setHostReveal() {
          
          hostReveal = null;
          while (hostReveal == null || hostReveal == firstChoice || hostReveal == winningDoor) {
            hostReveal = Math.floor(Math.random() * 3 + 1);
          };
          return hostReveal;
        };
        
        hostReveal = setHostReveal();
        
        function setDidSwitch() {
          if (activeTerminal == '#switch') {
            return 'switched to';
          } else {
            return 'stuck with';
          };
        };
        
        didSwitch = setDidSwitch();
        
        function setSecondChoice() {
          if (activeTerminal == '#switch') {
            secondChoice = null;
            while (secondChoice == null || secondChoice == firstChoice || secondChoice == hostReveal) {
                secondChoice = Math.floor(Math.random() * 3 + 1);
              };
            return secondChoice;
          } else {
            return firstChoice;
          };
        };
        
        secondChoice = setSecondChoice();
              
        function setWonLost() {
          if (secondChoice == winningDoor) {
            return 'won';
          } else {
            return 'lost';
          };
        };
        
        wonLost = setWonLost();
        
        // Print the log entries in the terminals
        $(activeTerminal + ' .terminal').append($('<p />').html('You chose door {0}.<br />The host revealed door {1}.<br />You {2} door {3}.<br />The car was behind door {4}.<br />You {5}.'.format(firstChoice, hostReveal, didSwitch, secondChoice, winningDoor, wonLost)));
        
        // Change the win counters... this part is horribly un-optimized
        if (activeTerminal == '#stick') {
          if (wonLost == 'won') {
            winCountStick = winCountStick + 1;
          };
          playCountStick = playCountStick + 1;
          
          $('#winCounterStick').text('{0}/{1} ({2}%)'.format(winCountStick, playCountStick, Math.round(winCountStick/playCountStick*10000)/100));
        } else {
          if (wonLost == 'won') {
            winCountSwitch = winCountSwitch + 1;
          };
          playCountSwitch = playCountSwitch + 1;

          $('#winCounterSwitch').text('{0}/{1} ({2}%)'.format(winCountSwitch, playCountSwitch, Math.round(winCountSwitch/playCountSwitch*10000)/100));
        };
        
        $(activeTerminal + ' .terminal').scrollTop($(activeTerminal + ' .terminal')[0].scrollHeight);
        
        // Terminal switch
        activeTerminal = activeTerminal == '#stick' ? '#switch' : '#stick';
        
      };
      // ...with an interval of [specified number of milliseconds]
      writeInterval = setInterval(writeToTerminal, 800);
      
    } else {
      // Stop writing to the active terminal if startState is true
      clearInterval(writeInterval);
    };
    
  });
  
  $('#reset').click(function() {
    location.reload();
  });
  
  
});
