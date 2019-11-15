<?php
/*
Plugin Name: ACF Additional Hint
Plugin URI: 
Description: A plugin to add help/hint text in ACF field.
Version: 1.0
Author: Koharu Homma
Author URI: 
Text Domain: acfadditionalhint
License: GPLv2 only
License URI: 
*/

if ( ! defined('ABSPATH') ) {
	exit;
}

class ACF_Additional_Hint {
	// property to control display of post_object type fields
	public $field_key_counter = [];

	private static $instance;

	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new ACF_Additional_Hint();
		}
		return self::$instance;
	}

	public function __construct() {
		add_action( 'acf/render_field_settings', [ $this, 'render_hint_fields' ] );
		add_action( 'acf/input/admin_enqueue_scripts', [ $this, 'hint_plugin_scripts' ] );
		add_action( 'acf/render_field', [ $this, 'render_hint_text_field' ], 10, 1 );
	}

	public function render_hint_fields( $field ) {
		$this->hint_text_field( $field );
		$this->hint_toggler_choice_field( $field );
	}

	private function hint_text_field( $field ) {
		acf_render_field_setting( $field, array(
			'label' => __( 'Add text for hint' ),
			'instructions' => 'Please input the texts to help users for this field.(You can use HTML tags too)',
			'name' => 'hint_text',
			'type' => 'text',
			'ui' => 1,
		), true );
	}

	private function hint_toggler_choice_field( $field ) {
		$choices = array(
			'click_toggle' => 'Toggle display of the message by button.',
			'show_hover' => 'Show the message in tooltip when you mouse over the icon.',
		);

		acf_render_field_setting( $field, array(
			'label' => __( 'Presentation of your help/hint text' ),
			'instructions' => 'Please select the way to display your message.',
			'name' => 'hint_toggler',
			'type' => 'radio',
			'choices' => $choices,
			'ui' => 2,
		), true );
	}

	public function hint_plugin_scripts() {
		// register styles
		wp_register_style( 'additional-hint-plugin-style', plugin_dir_url(__FILE__) . 'css/style.css', false, '1.0.0' );
		wp_enqueue_style( 'additional-hint-plugin-style' );

		// register scripts
		wp_register_script( 'additional-hint-plugin-script', plugin_dir_url(__FILE__) . 'js/main.js', false, '1.0.0' );
		wp_enqueue_script( 'additional-hint-plugin-script' );
	}

	public function render_hint_text_field( $field ) {
		// bail early if $field['hint_text'] key exists
		if ( ! isset( $field['hint_text'] ) || ! $field['hint_text'] ) {
			return;
		}

		// in case of click_toggle
		if ( $field['hint_toggler'] == 'click_toggle' ) {
			$this->hint_toggler_click_toggle( $field );
			return;
		}

		// in case of show_hover
		if ( $field['hint_toggler'] == 'show_hover' ) {
			$this->hint_toggler_show_hover( $field );
			return;
		}

		return;
	}

	private function hint_toggler_click_toggle( $field ) {
		if ( isset( $this->field_key_counter[ $field['key'] ] ) ) {
			return;
		}

		echo '<span class="hint-btn" data-id="' .$field['id']. '" data-key="' .$field['key']. '">HELP</span>';
		echo '<div class="hint-text click-toggle-hint-text" data-key="' .$field['key']. '" style="display: none;">' .$field['hint_text']. '</div>';

		$this->field_key_counter[ $field['key'] ] = true;
	}

	private function hint_toggler_show_hover( $field ) {
		if ( isset( $this->field_key_counter[ $field['key'] ] ) ) {
			return;
		}

		echo 
		'<div class="tooltip1" data-id="' .$field['id']. '" data-key="' .$field['key']. '">
			<span class="hint-icon dashicons dashicons-editor-help"></span>
			<div class="description1">Hint: ' .$field['hint_text']. '</div>
		</div>';

		$this->field_key_counter[ $field['key'] ] = true;
	}
}

ACF_Additional_Hint::get_instance();