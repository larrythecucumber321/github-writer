/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import Kebab from '../../../src/app/plugins/kebab';
import DropdownView from '@ckeditor/ckeditor5-ui/src/dropdown/dropdownview';
import ToolbarView from '@ckeditor/ckeditor5-ui/src/toolbar/toolbarview';

import { createTestEditor } from '../../_util/ckeditor';

import iconKebab from '../../../src/app/icons/kebab.svg';
import iconBold from '@ckeditor/ckeditor5-core/theme/icons/bold.svg';
import iconItalic from '@ckeditor/ckeditor5-basic-styles/theme/icons/italic.svg';

describe( 'Plugins', () => {
	describe( 'Kebab', () => {
		let editor, dropdown;

		{
			beforeEach( 'create test editor', () => {
				return createTestEditor( '', [ Kebab ], { kebabToolbar: [ 'bold', 'italic' ] } )
					.then( editorObjects => ( { editor } = editorObjects ) );
			} );

			beforeEach( () => {
				dropdown = editor.ui.componentFactory.create( 'kebab' );
			} );

			afterEach( 'cleanup test editor', () => {
				editor.destroy();
			} );
		}

		it( 'should register the kebab component', () => {
			expect( editor.ui.componentFactory.has( 'kebab' ) ).to.be.true;
			expect( editor.ui.componentFactory.create( 'kebab' ) ).to.be.an.instanceOf( DropdownView );
		} );

		it( 'should have the right classes', () => {
			expect( dropdown.buttonView.class ).to.equals( 'github-writer-kebab-button' );
		} );

		it( 'should have the right tooltip', () => {
			expect( dropdown.buttonView.tooltip ).to.equals( 'More options...' );
		} );

		it( 'button should have the right label', () => {
			expect( dropdown.buttonView.label ).to.equals( 'More options...' );
		} );

		it( 'button should have the right icon', () => {
			expect( dropdown.buttonView.icon ).to.equals( iconKebab );
		} );

		it( 'should be defined as toolbarView', () => {
			expect( dropdown.toolbarView ).to.be.an.instanceOf( ToolbarView );
		} );

		it( 'should have the right toolbar items', () => {
			const icons = [ iconBold, iconItalic ];

			expect( dropdown.toolbarView.items.length ).to.equals( icons.length );

			icons.forEach( ( icon, index ) => {
				expect( dropdown.toolbarView.items.get( index ).icon, 'index ' + index ).to.equals( icon );
			} );
		} );
	} );
} );
