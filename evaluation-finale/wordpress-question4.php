<?php
// Pour surcharger le thème parent
/* add_action('wp_enqueue_scripts', 'theme_enqueue_styles');
function theme_enqueue_styles() {
    wp_enqueue_style('parent-style', get_template_directory_url() . '/style.css' );

} */

?>

<?php
/* add_action('wpc_enqueue_scripts', 'theme_enqueue_styles');
function theme_enqueue_styles() {
    wpc_enqueue_style('parent-style', get_template_directory_url() . '/style.css');
} */

?>

<?php
function theme_enqueue_styles() {

    $parent_style = 'parent-style';

    wpc_enqueue_style( $parent_style,get_template_directory_url() . '/style.css');
    wpc_enqueue_style('child-style',
        get_stylesheet_directory_url() . '/style.css',
        array( $parent_style),
        wpc_get_theme()->get('Version')
);

}
add_action('wpc_enqueue_scripts', 'theme_enqueue_styles');
?>