<?php
/**
 * Template Name: Voter ID Laws Template
 */

?>

<?php while (have_posts()) : the_post(); ?>

  <?php get_template_part('templates/content', 'voter-ID-laws'); ?>
  <?php get_template_part('templates/content', 'share'); ?>

<?php endwhile; ?>
