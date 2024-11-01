<?php
function enqueue_prism_locally() {
    wp_enqueue_script('prism', plugin_dir_url(__FILE__) . 'path/to/prism.min.js', array(), '1.25.0', true);
    wp_enqueue_style('prism-style', plugin_dir_url(__FILE__) . 'path/to/prism.min.css', array(), '1.25.0');
}
add_action('enqueue_block_assets', 'enqueue_prism_locally');
