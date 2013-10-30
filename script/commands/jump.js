/* kate-script
 * author: Dzikri Aziz <kucrut@kucrut.org>
 * license: GPLv2
 * revision: 4
 * kate-version: 3.11.2
 * type: commands
 * functions: jumpUp, jumpDown
 *
 * Move cursor to next/previous paragraph
 */

require('cursor.js');
require('range.js');


function jumpDown() {
	return _jump();
}


function jumpUp() {
	return _jump( true );
}


function action( cmd ) {
	var a = new Object();
	if ( cmd == 'jumpUp' ) {
		a.text = i18n('Move cursor to previous paragraph');
		a.shortcut = 'Alt+Up';
		a.icon = "";
		a.category = "";
		a.interactive = false;
	}
	else if ( cmd == 'jumpDown' ) {
		a.text = i18n('Move cursor to next paragraph');
		a.shortcut = 'Alt+Down';
		a.icon = "";
		a.category = "";
		a.interactive = false;
	}

	return a;
}


function help( cmd ) {
  if (cmd == 'jumpUp') {
    return i18n('Move cursor to previous paragraph');
  }
  else if (cmd == 'jumpDown') {
    return i18n('Move cursor to next paragraph');
  }
}


function _isEmptyLine( line ) {
	return ( document.firstColumn( line ) === -1 );
}


function _jump( up ) {
	var init = currentLine = view.cursorPosition().line;
	var lines = document.lines();
	var target;

	if ( document.firstColumn(currentLine) == -1 )
		currentLine = document.prevNonEmptyLine(currentLine);

	if ( up === true ) {
		target = 0;
		while ( currentLine-- > 0 ) {
			if ( _isEmptyLine( currentLine ) && document.nextNonEmptyLine( currentLine ) !== init ) {
				target = document.nextNonEmptyLine(currentLine);
				break;
			}
		}
	}

	else {
		target = ( lines - 1 );
		while ( currentLine++ < lines ) {
			if ( _isEmptyLine( currentLine ) && ( document.nextNonEmptyLine( currentLine ) !== -1 ) ) {
				target = document.nextNonEmptyLine(currentLine);
				break;
			}
		}
	}

	view.setCursorPosition(target, 0);
}
