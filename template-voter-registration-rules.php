<?php
/**
 * Template Name: Voter Registration Rules Template
 */

?>

<?php while (have_posts()) : the_post(); ?>

  <?php get_template_part('templates/content', 'voter-registration-rules'); ?>
  <?php get_template_part('templates/content', 'share'); ?>

<?php endwhile; ?>
