<?php
/**
 * Plugin Name: ACF Additional Hint
 * Plugin URI: 
 * Description: A plugin to add help/hint text in ACF field.
 * Version: 1.0
 * Author: Koharu Homma
 * Author URI: 
 * Text Domain: acfadditionalhint
 * License: GPLv2 only
 * License URI: 
*/

if ( ! defined('ABSPATH') ) {
	exit;
}

class ACF_Additional_Hint {
	/**
	 * @var array
	 * counter to prevent the functions from going through twice
	 */
	public $field_key_counter = [];

	/**
	 * @var null
	 * singleton instance
	 */
	private static $instance;

	/**
	 * @return object $instance
	 * create singleton instance
	 */
	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new ACF_Additional_Hint();
		}
		return self::$instance;
	}

	/**
	 * call functions at once when the instance is created
	 */
	public function __construct() {
		add_action( 'acf/render_field_settings', [ $this, 'render_hint_fields' ] );
		add_action( 'acf/input/admin_enqueue_scripts', [ $this, 'hint_plugin_scripts' ] );
		add_action( 'acf/render_field', [ $this, 'render_hint_text_field' ], 10, 1 );
	}

	/**
	 * @param array $field
	 * render fields for showing option and textarea to input message
	 */
	public function render_hint_fields( $field ) {
		$this->hint_toggler_choice_field( $field );
		$this->hint_text_field( $field );
	}

	/**
	 * @param array $field
	 * render field for showing options
	 */
	private function hint_toggler_choice_field( $field ) {
		$choices = array(
			'click_toggle' => 'Toggle display of the message by button.',
			'show_hover' => 'Show the message in tooltip when you mouse over the icon.',
			'none' => 'none',
		);

		acf_render_field_setting( $field, array(
			'label' => __( '[Additional Hint] How to display your help/hint text' ),
			'instructions' => 'Please select how to show your message.',
			'name' => 'hint_toggler',
			'type' => 'radio',
			'choices' => $choices,
			'default_value' => 'none',
			'ui' => 1,
		), true );
	}

	/**
	 * @param array $field
	 * render field for textarea to input message
	 */
	private function hint_text_field( $field ) {
		acf_render_field_setting( $field, array(
			'label' => __( '[Additional Hint] Add text for hint' ),
			'instructions' => 'Please input the text you want to display.(You can use HTML tags too)',
			'name' => 'hint_text',
			'type' => 'textarea',
			'ui' => 2,
		), true );
	}

	/**
	 * load original stylesheet and script
	 */
	public function hint_plugin_scripts() {
		// register styles
		wp_register_style( 'additional-hint-plugin-style', plugin_dir_url(__FILE__) . 'css/style.css', false, '1.0.0' );
		wp_enqueue_style( 'additional-hint-plugin-style' );

		// register scripts
		wp_register_script( 'additional-hint-plugin-script', plugin_dir_url(__FILE__) . 'js/main.js', false, '1.0.0' );
		wp_enqueue_script( 'additional-hint-plugin-script' );
	}

	/**
	 * @param array $field
	 * render help text and icon/button depend on the selected options
	 */
	public function render_hint_text_field( $field ) {
		// bail early if $field['hint_text'] key exists
		if ( ! isset( $field['hint_text'] ) ) {
			return;
		}

		// in case of click_toggle
		if ( $field['hint_toggler'] === 'click_toggle' ) {
			$this->hint_toggler_click_toggle( $field );
			return;
		}

		// in case of show_hover
		if ( $field['hint_toggler'] === 'show_hover' ) {
			$this->hint_toggler_show_hover( $field );
			return;
		}

		return;
	}

	/**
	 * @param array $field
	 * render hint text and the button to toggle the hint text in ACF input field
	 */
	private function hint_toggler_click_toggle( $field ) {
		// prevent this function from going through twice
		if ( isset( $this->field_key_counter[ $field['key'] ] ) ) {
			return;
		}

		// output the button to show/hide hint text
		echo 
		'<div class="btn-area">
			<span class="btn-text">HELP</span>
			<div class="hint-btn" data-id="' .$field['id']. '" data-key="' .$field['key']. '">
				<div class="swImg"></div>
			</div>
		</div>';

		// output the hint text
		echo '<div class="hint-text" data-key="' .$field['key']. '" style="display: none;">' .$field['hint_text']. '</div>';

		// set true if this function is executed
		$this->field_key_counter[ $field['key'] ] = true;
	}

	/**
	 * @param array $field
	 * render icon and tooltip in ACF input fields
	 */
	private function hint_toggler_show_hover( $field ) {
		// prevent this function from going through twice
		if ( isset( $this->field_key_counter[ $field['key'] ] ) ) {
			return;
		}

		// output the icon and the tooltip
		echo 
		'<div class="acf-hint-tooltip" data-id="' .$field['id']. '" data-key="' .$field['key']. '">
			<span class="hint-icon dashicons dashicons-editor-help"></span>
			<div class="acf-hint-description">Hint: ' .$field['hint_text']. '</div>
		</div>';

		// set true if this function is executed
		$this->field_key_counter[ $field['key'] ] = true;
	}
}

// excecute the method to create singleton instance
ACF_Additional_Hint::get_instance();