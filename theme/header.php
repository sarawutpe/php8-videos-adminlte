<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="assets/css/styles.css">
</head>

<body>
  <section class="header">
    <div class="container">
      <div class="head">
        <div class="logo">
          <a href="">
            <img src="https://149841302.v2.pressablecdn.com/wp-content/uploads/2021/03/logo.png" alt="logo">
          </a>
        </div>
        <input type="search" name="search">
      </div>
      <div class="nav">
        <ul>
          <a class="active" href="<?php "/"; ?>">
            <li>Home</li>
          </a>
          <a href="<?php echo "/videos"; ?>">
            <li>All Videos</li>
          </a>
          <a href="<?php echo "/console"; ?>">
            <li>Admin</li>
          </a>
        </ul>
      </div>
    </div>
  </section>