<?php
/*
Plugin Name: Software Information
Description: With this Gutenberg block you can specify the versions of the software you are using, especially in specialized technical instructions, and possibly link to other articles/websites.
Version: 2024.03.15
Author: Benedikt Schächner
Author URI: https://technik.schächner.de
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.txt
Text Domain: used-software
*/

defined( 'ABSPATH' ) || exit;

// Register the Gutenberg block
function used_software_register_block() {
    register_block_type('used-software/software-information', array(
        'editor_script' => 'used-software-information',
    ));
}
add_action('init', 'used_software_register_block');

// Enqueue scripts and styles for the Gutenberg block
function used_software_enqueue_script() {
    wp_enqueue_script(
        'used-software-information',
        plugins_url('software-information.js', __FILE__),
        array('wp-blocks', 'wp-editor', 'wp-components', 'wp-i18n'),
        filemtime(plugin_dir_path(__FILE__) . 'software-information.js'),
        true
    );

    // Localize script for translation
    wp_set_script_translations('used-software-information', 'used-software', plugin_dir_path(__FILE__) . 'languages');
}
add_action('enqueue_block_editor_assets', 'used_software_enqueue_script');

// Add menu page
function used_software_add_menu_page() {
    add_menu_page(
        __('Software Information', 'used-software'), // Page title
        __('Software Information', 'used-software'), // Menu title
        'manage_options', // Capability required
        'used_software_settings', // Menu slug
        'used_software_render_options_page', // Callback function
        'dashicons-admin-generic' // Icon (optional)
    );
}
add_action('admin_menu', 'used_software_add_menu_page');

// Render options page content
function used_software_render_options_page() {
    ?>
    <div class="wrap">
        <h1><?php esc_html_e('Software Information Settings', 'used-software'); ?></h1>
        <p><?php esc_html_e('Current Version:', 'used-software'); ?> <?php echo "This plugin is developed by Benedikt Schächner"; ?></p>
    </div>
    <?php
}


// Register plugin settings and sections
function used_software_register_settings() {
    // No settings to register
}
add_action('admin_init', 'used_software_register_settings');
