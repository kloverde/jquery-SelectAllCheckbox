/*
 * SelectAllCheckbox
 * https://www.github.com/kloverde/jquery-SelectAllCheckbox
 *
 * Copyright (c) 2016, Kurtis LoVerde
 * All rights reserved.
 *
 * Donations:  https://paypal.me/KurtisLoVerde/5
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     1. Redistributions of source code must retain the above copyright
 *        notice, this list of conditions and the following disclaimer.
 *     2. Redistributions in binary form must reproduce the above copyright
 *        notice, this list of conditions and the following disclaimer in the
 *        documentation and/or other materials provided with the distribution.
 *     3. Neither the name of the copyright holder nor the names of its
 *        contributors may be used to endorse or promote products derived from
 *        this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

"use strict";

( function() {
   "use strict";

   var groupName = "group";
   var checkboxContainer;
   var affectedBoxes = null;
   var groupState = null;

   $( document ).ready( function() {
      checkboxContainer = $( "#checkboxContainer" );
   } );

   function callback( boxes, checkedState ) {
      affectedBoxes = boxes;
      groupState = checkedState;
   }

   function resetCallback() {
      affectedBoxes = null;
      groupState = null;
   }

   function initGroup( boxConfig, isIndeterminate ) {
      checkboxContainer.html( "" );

      // Create the select-all checkbox
      $( "<input/>", {
         type : "checkbox",
         id   : "selectAll",
      } ).appendTo( checkboxContainer );

      // Create the rest of the checkboxes
      for( var i = 0; i < boxConfig.length; i++ ) {
         $( "<input/>", {
            type : "checkbox",
            id   : "box" + i,
            name : groupName
         } ).appendTo( checkboxContainer );
      }

      $( "#selectAll" ).selectAllCheckbox( {
         checkboxesName   : groupName,
         onChangeCallback : callback,
         useIndeterminate : isIndeterminate
      } );
   }

   function log( msg ) {
      console.log( msg );
   }

   function validateSelectAll( expected, isInit ) {
      var selectAll = $( "#selectAll" );

      if( expected === SelectAllState.CHECKED ) {
         ok( selectAll.is(":checked"), "The select-all checkbox should be CHECKED " + (isInit ? "at initialization" : "after being clicked") );
         equal( selectAll.prop("indeterminate"), false, "The select-all checkbox should not be indeterminate " + (isInit ? "at initialization" : "after being clicked") );
      } else if( expected === SelectAllState.NOT_CHECKED ) {
         ok( !selectAll.is(":checked"), "The select-all checkbox should be initialized to NOT CHECKED " + (isInit ? "at initialization" : "after being clicked") );
         equal( selectAll.prop("indeterminate"), false, "The select-all checkbox should not be indeterminate " + (isInit ? "at initialization" : "after being clicked") );
      } else if( expected === SelectAllState.PARTIALLY_CHECKED ) {
         ok( selectAll.is(":checked"), "The select-all checkbox should be PARTIALLY CHECKED " + (isInit ? "at initialization" : "") );
         equal( selectAll.prop("indeterminate"), true, "The select-all checkbox should be indeterminate " + (isInit ? "at initialization" : "after being clicked") );
      } else {
         throw "Unknown value for expected: " + expected;
      }
   }

   function validateBoxStates( expectedBoxStates ) {
      var boxStateIdx = 0;

      $( "input[name='group']" ).each( function() {
         var box = $( this );
         equal( box.is(":checked"), expectedBoxStates[boxStateIdx], "Verify " + box.attr("id") + " is " + (expectedBoxStates[boxStateIdx] ? "checked" : "not checked") );
         boxStateIdx++;
      } );
   }

   QUnit.config.hidepassed = true;

   QUnit.cases( testCases ).test( "Test", function(params) {
      initGroup( params.boxes, params.isIndeterminate );
      validateSelectAll( params.expectedSelectAllOnInit, true );

      for( var i = 0; i < params.clickScript.length; i++ ) {
         var click = params.clickScript[i];

         resetCallback();

         if( isNaN(click.whichBox ) ) {
            $( "#" + click.whichBox ).click();
         } else {
            $( "#box" + click.whichBox ).click();
         }

         validateSelectAll( click.expectedSelectAllState, false );
         validateBoxStates( click.expectedBoxStates );
      }
   } );

   QUnit.jUnitDone( function(report) {
      document.getElementById( "done" ).style.visibility = "visible";

      if( typeof console !== "undefined" ) {
         console.log( report.xml );  // TODO:  Probably need Grunt integration to run a server to upload this to
      }
   } );
} )();