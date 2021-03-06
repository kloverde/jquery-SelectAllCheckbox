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

var testCases;

( function() {
   // These do not define a select-all box
   var checkboxGroups = {
      noneDisabled_noneChecked : [ box(true, false),
                                   box(true, false),
                                   box(true, false),
                                   box(true, false) ],

      noneDisabled_someChecked : [ box(true, false),
                                   box(true, true),
                                   box(true, false),
                                   box(true, true) ],

      noneDisabled_allChecked  : [ box(true, true),
                                   box(true, true),
                                   box(true, true),
                                   box(true, true) ],

      hasDisabled_noneChecked  : [ box(true,  false),
                                   box(true,  false),
                                   box(false, false),
                                   box(true,  false) ],

      hasDisabled_someEnabledChecked : [ box(true,  false),
                                         box(true,  false),
                                         box(false, false),
                                         box(true,  true) ],

      hasDisabled_someEnabledAndDisabledChecked : [ box(true,  false),
                                                    box(true,  false),
                                                    box(false, true),
                                                    box(true,  true) ]
   };

   testCases = [
      //--------------------

      tc( "determinate noneDisabled_noneChecked", checkboxGroups["noneDisabled_noneChecked"], false, SelectAllState.NOT_CHECKED,
          [ clickScript("selectAll", [0, 1, 2, 3], GroupState.ALL,  SelectAllState.CHECKED,     [true,  true,  true,  true]),
            clickScript("selectAll", [0, 1, 2, 3], GroupState.NONE, SelectAllState.NOT_CHECKED, [false, false, false, false]),
            clickScript("selectAll", [0, 1, 2, 3], GroupState.ALL,  SelectAllState.CHECKED,     [true,  true,  true,  true]) ]
      ),

      tc( "indeterminate noneDisabled_noneChecked", checkboxGroups["noneDisabled_noneChecked"], true, SelectAllState.NOT_CHECKED,
          [ clickScript("selectAll", [0, 1, 2, 3], GroupState.ALL,  SelectAllState.CHECKED,     [true,  true,  true,  true]),
            clickScript("selectAll", [0, 1, 2, 3], GroupState.NONE, SelectAllState.NOT_CHECKED, [false, false, false, false]),
            clickScript("selectAll", [0, 1, 2, 3], GroupState.ALL,  SelectAllState.CHECKED,     [true,  true,  true,  true]) ]
      ),

      //--------------------

      tc( "determinate noneDisabled_someChecked", checkboxGroups["noneDisabled_someChecked"], false, SelectAllState.NOT_CHECKED,
          [ clickScript("0", [0], GroupState.SOME, SelectAllState.NOT_CHECKED,  [true, true, false, true]),
            clickScript("2", [2], GroupState.ALL,  SelectAllState.CHECKED,      [true, true, true, true]), ]
      ),

      tc( "indeterminate noneDisabled_someChecked", checkboxGroups["noneDisabled_someChecked"], true, SelectAllState.PARTIALLY_CHECKED,
          [ clickScript("0", [0], GroupState.SOME,  SelectAllState.PARTIALLY_CHECKED,  [true, true, false, true]),
            clickScript("2", [2], GroupState.ALL,   SelectAllState.CHECKED,            [true, true, true, true]), ]
      ),

      //--------------------

      tc( "determinate noneDisabled_allChecked", checkboxGroups["noneDisabled_allChecked"], false, SelectAllState.CHECKED,
          [ clickScript("3",         [3], GroupState.SOME,  SelectAllState.NOT_CHECKED,  [true, true, true, false]),
            clickScript("selectAll", [3], GroupState.ALL,   SelectAllState.CHECKED,      [true, true, true, true]) ]
      ),

      tc( "indeterminate noneDisabled_allChecked", checkboxGroups["noneDisabled_allChecked"], true, SelectAllState.CHECKED,
           [ clickScript("3",         [3],           GroupState.SOME,  SelectAllState.PARTIALLY_CHECKED,  [true,  true,  true,  false]),
             clickScript("selectAll", [3],           GroupState.ALL,   SelectAllState.CHECKED,            [true,  true,  true,  true]),
             clickScript("selectAll", [0, 1, 2, 3],  GroupState.NONE,  SelectAllState.NOT_CHECKED,        [false, false, false, false]) ]
      ),

      //--------------------

      tc( "determinate hasDisabled_noneChecked", checkboxGroups["hasDisabled_noneChecked"], false, SelectAllState.NOT_CHECKED,
          [ clickScript("2",         null,      null,             SelectAllState.NOT_CHECKED,  [false, false, false, false]),
            clickScript("selectAll", [0, 1, 3], GroupState.SOME,  SelectAllState.NOT_CHECKED,  [true,  true,  false, true]),
            clickScript("selectAll", [0, 1, 3], GroupState.NONE,  SelectAllState.NOT_CHECKED,  [false, false, false, false]) ]
      ),

      tc( "indeterminate hasDisabled_noneChecked", checkboxGroups["hasDisabled_noneChecked"], true, SelectAllState.NOT_CHECKED,
          [ clickScript("2",         null,      null,             SelectAllState.NOT_CHECKED,        [false, false, false, false]),
            clickScript("selectAll", [0, 1, 3], GroupState.SOME,  SelectAllState.PARTIALLY_CHECKED,  [true, true, false, true]),
            clickScript("selectAll", [0, 1, 3], GroupState.NONE,  SelectAllState.NOT_CHECKED,        [false, false, false, false]) ]
      ),

      //--------------------

      tc( "determinate hasDisabled_someEnabledChecked", checkboxGroups["hasDisabled_someEnabledChecked"], false, SelectAllState.NOT_CHECKED,
          [ clickScript("2",         null,      null,             SelectAllState.NOT_CHECKED,  [false, false, false, true]),
            clickScript("selectAll", [0, 1],    GroupState.SOME,  SelectAllState.NOT_CHECKED,  [true,  true,  false, true]),
            clickScript("0",         [0],       GroupState.SOME,  SelectAllState.NOT_CHECKED,  [false, true,  false, true]),
            clickScript("selectAll", [0],       GroupState.SOME,  SelectAllState.NOT_CHECKED,  [true,  true,  false, true]),
            clickScript("selectAll", [0, 1, 3], GroupState.NONE,  SelectAllState.NOT_CHECKED,  [false, false, false, false]) ]
      ),

      tc( "indeterminate hasDisabled_someEnabledChecked", checkboxGroups["hasDisabled_someEnabledChecked"], true, SelectAllState.PARTIALLY_CHECKED,
            [ clickScript("2",         null,      null,             SelectAllState.PARTIALLY_CHECKED,  [false, false, false, true]),
              clickScript("selectAll", [0, 1],    GroupState.SOME,  SelectAllState.PARTIALLY_CHECKED,  [true,  true,  false, true]),
              clickScript("0",         [0],       GroupState.SOME,  SelectAllState.PARTIALLY_CHECKED,  [false, true,  false, true]),
              clickScript("selectAll", [0],       GroupState.SOME,  SelectAllState.PARTIALLY_CHECKED,  [true,  true,  false, true]),
              clickScript("selectAll", [0, 1, 3], GroupState.NONE,  SelectAllState.NOT_CHECKED,        [false, false, false, false]) ]
      ),

      //--------------------

      tc( "determinate hasDisabled_someEnabledAndDisabledChecked", checkboxGroups["hasDisabled_someEnabledAndDisabledChecked"], false, SelectAllState.NOT_CHECKED,
          [ clickScript("selectAll", [0, 1],    GroupState.ALL,  SelectAllState.CHECKED,      [true,  true,  true, true]),
            clickScript("selectAll", [0, 1, 3], GroupState.SOME, SelectAllState.NOT_CHECKED,  [false, false, true, false]) ]
      ),

      tc( "indeterminate hasDisabled_someEnabledAndDisabledChecked", checkboxGroups["hasDisabled_someEnabledAndDisabledChecked"], true, SelectAllState.PARTIALLY_CHECKED,
          [ clickScript("selectAll", [0, 1],    GroupState.ALL,  SelectAllState.CHECKED,            [true,  true,  true, true]),
            clickScript("selectAll", [0, 1, 3], GroupState.SOME, SelectAllState.PARTIALLY_CHECKED,  [false, false, true, false]) ]
      )
   ];

   validateTestCases();

   /**
    * Creates a checkbox template
    */
   function box( isEnabled, isChecked) {
      return {
         enabled : isEnabled,
         checked : isChecked
      };
   }

   /**
    * <pre>
    * Creates a test case template.  Returns an object with the following properties:
    *
    * name (string) : The name of the test
    *
    * boxes : The checkbox group configuration - does not include a definition for the select-all checkbox
    *
    * isIndeterminate (boolean) : Whether the select-all checkbox behaves as indeterminate (allows partial checking)
    *
    * expectedSelectAllOnInit : Indicates whether the select-all checkbox is expected to be unchecked, checked
    *                           or partially checked upon initialization, depending on the supplied values for
    *                           <code>isIndeterminate</code> and <code>boxes</code>.  See click().
    *
    * clickScript : An optional array of objects used to automate a sequence of clicks on checkboxes
    * </pre>
    */
   function tc( title, boxes, isIndeterminate, expectedSelectAllOnInit, clickScript ) {
      if( title === null || title === undefined || title === "" ) throw "Test has no title";
      if( boxes === null || boxes === undefined || boxes.length < 1 ) throw "No checkboxes were defined";
      if( isIndeterminate === null || isIndeterminate === undefined ) throw "isIndeterminate has no value";
      if( isIndeterminate !== true && isIndeterminate !== false ) throw "isIndeterminate must be a boolean";
      if( expectedSelectAllOnInit !== SelectAllState.CHECKED && expectedSelectAllOnInit !== SelectAllState.NOT_CHECKED && expectedSelectAllOnInit !== SelectAllState.PARTIALLY_CHECKED ) throw "expectedSelectAllOnInit must have a value";
      if( !isIndeterminate && expectedSelectAllOnInit === SelectAllState.PARTIALLY_CHECKED ) throw "Select-all is expected to be indeterminate but is configured as determinate";

      return {
         title : title,
         boxes : boxes,
         isIndeterminate : isIndeterminate,
         expectedSelectAllOnInit : expectedSelectAllOnInit,
         clickScript : clickScript
      };
   }

   /**
    * <pre>
    * Returns an object used to automate a click on a checkbox and analyze the result of the click.  The returned object has the following properties:
    *
    * whichBox : Which box to click.  0-indexed int for members of checkboxGroups, or "selectAll" for select-all.
    * expectedCallbackChanged : array<int> - which checkboxes should be returned by the callback
    * expectedCallbackGroupState : string - which select-all status should be returned by the callback
    * expectedSelectAllState : string - "checked|notChecked|partiallyChecked" - the expected state of the select-all checkbox
    * expectedBoxStates : array<bool> - the expected states of the checkboxes, not including the select-all checkbox.  True = checked, false = not checked.
    * </pre>
    */
   function clickScript( whichBox, expectedCallbackChanged, expectedCallbackGroupState, expectedSelectAllState, expectedBoxStates ) {
      return {
         whichBox : whichBox,
         expectedCallbackChanged : expectedCallbackChanged,
         expectedCallbackGroupState : expectedCallbackGroupState,
         expectedSelectAllState : expectedSelectAllState,
         expectedBoxStates : expectedBoxStates
      };
   }

   function validateTestCases() {
      // Check the test cases for duplicate test names

      for( var i = 0; i < testCases.length; i++ ) {
         var name = testCases[i].title;

         for( var j = i + 1; j < testCases.length; j++ ) {
            var name2 = testCases[j].title;

            if( name.toLowerCase() === name2.toLowerCase() ) {
               throw "Duplicate test name (case-insensitive): " + name;
            }
         }
      }

      return true;
   }
} )();
