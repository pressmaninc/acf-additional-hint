<?php
/**
 * Plugin Name: ACF Additional Hint
 * Plugin URI:
 * Description: A plugin to add help/hint text in ACF field.
 * Version: 1.3
 * Author: PRESSMAN
 * Author URI: https://www.pressman.ne.jp/
 * Text Domain: acf-additional-hint
 * Domain Path: /languages
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
*/

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class ACF_Additional_Hint.
 */
class ACF_Additional_Hint {
	/**
	 * Counter to prevent the functions from going through twice.
	 * @var array
	 */
	public $field_key_counter = [];

	/**
	 * @var ACF_Additional_Hint
	 */
	private static $instance;

	/**
	 * Creates singleton instance.
	 * @return $instance
	 */
	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self;
		}
		return self::$instance;
	}

	/**
	 * ACF_Additional_Hint constructor.
	 */
	public function __construct() {
		add_action( 'acf/render_field_settings', [ $this, 'render_hint_fields' ] );
		add_action( 'acf/input/admin_enqueue_scripts', [ $this, 'hint_plugin_scripts' ] );
		add_action( 'acf/render_field', [ $this, 'render_hint_text_field' ], 10, 1 );
		load_plugin_textdomain( 'acf-additional-hint', false, basename( dirname( __FILE__ ) ).'/languages' );
	}

	/**
	 * Displays the options and the textarea to input message.
	 * @param array $field
	 */
	public function render_hint_fields( $field ) {
		$this->hint_toggler_choice_field( $field );
		$this->hint_text_field( $field );
	}

	/**
	 * Displays the field to select options.
	 * @param array $field
	 */
	private function hint_toggler_choice_field( $field ) {
		$choices = array(
			'click_toggle' => __( 'Toggle display of the message by button.', 'acf-additional-hint' ),
			'show_hover'   => __( 'Show the message in tooltip when you mouse over the icon.', 'acf-additional-hint' ),
			'none'         => __( 'None', 'acf-additional-hint' ),
		);

		acf_render_field_setting( $field, array(
			'label'         => __( '[Additional Hint] How to display your help/hint text', 'acf-additional-hint' ),
			'instructions'  => __( 'Please select how to show your message.', 'acf-additional-hint' ),
			'name'          => 'hint_toggler',
			'type'          => 'radio',
			'choices'       => $choices,
			'default_value' => 'none',
			'ui'            => 1,
		), true );
	}

	/**
	 * Displays the field to input message.
	 * @param array $field
	 */
	private function hint_text_field( $field ) {
		acf_render_field_setting( $field, array(
			'label'        => __( '[Additional Hint] Add text for hint', 'acf-additional-hint' ),
			'instructions' => __('Please input the text you want to display.(You can use HTML tags too)', 'acf-additional-hint' ),
			'name'         => 'hint_text',
			'type'         => 'textarea',
			'ui'           => 2,
		), true );
	}

	/**
	 * Loads original stylesheet and script.
	 */
	public function hint_plugin_scripts() {
		// Get the version of this plugin.
		$data = get_file_data( __FILE__, array( 'version' => 'Version' ) );

		// Loads styles.
		wp_enqueue_style( 'additional-hint-plugin-style', plugin_dir_url(__FILE__) . 'css/style.css', false, $data['version'] );

		// Loads scripts.
		wp_enqueue_script( 'additional-hint-plugin-script', plugin_dir_url(__FILE__) . 'js/main.js', false, $data['version'], true );
	}

	/**
	 * Displays the help text and the icon/button depend on the selected options.
	 * @param array $field
	 */
	public function render_hint_text_field( $field ) {
		// Returns if $field['hint_text'] key exists or no hint text is entered.
		if ( ! isset( $field['hint_text'] ) || ! $field['hint_text'] ) {
			return;
		}

		// In case of click_toggle.
		if ( 'click_toggle' === $field['hint_toggler'] ) {
			$this->hint_toggler_click_toggle( $field );
			return;
		}

		// In case of show_hover.
		if ( 'show_hover' === $field['hint_toggler'] ) {
			$this->hint_toggler_show_hover( $field );
			return;
		}

		return;
	}

	/**
	 * Displays the hint text and the button in ACF input field.
	 * @param array $field
	 */
	private function hint_toggler_click_toggle( $field ) {
		// Prevents this function from going through twice.
		if ( isset( $this->field_key_counter[ $field['key'] ] ) ) {
			return;
		}

		// Outputs the button to show and hide hint text.
		echo 
		'<div class="btn-area">
			<span class="btn-text">HELP</span>
			<div class="hint-btn" data-id="' .$field['id']. '" data-key="' .$field['key']. '">
				<div class="switch-circle"></div>
			</div>
		</div>';

		// Outputs the hint text.
		echo '<div class="hint-text" data-key="' .$field['key']. '" style="display: none;">' .$field['hint_text']. '</div>';

		// Sets true if this function is executed.
		$this->field_key_counter[ $field['key'] ] = true;
	}

	/**
	 * Displays icon and tooltip in ACF input fields.
	 * @param array $field
	 */
	private function hint_toggler_show_hover( $field ) {
		// Prevents this function from going through twice.
		if ( isset( $this->field_key_counter[ $field['key'] ] ) ) {
			return;
		}

		// Outputs the icon and the tooltip.
		echo 
		'<div class="acf-hint-tooltip" data-id="' .$field['id']. '" data-key="' .$field['key']. '">
			<span class="hint-icon dashicons dashicons-editor-help"></span>
			<div class="acf-hint-description">' .$field['hint_text']. '</div>
		</div>';

		// Sets true if this function is executed.
		$this->field_key_counter[ $field['key'] ] = true;
	}
}

// Executes the method to create singleton instance.
ACF_Additional_Hint::get_instance();
