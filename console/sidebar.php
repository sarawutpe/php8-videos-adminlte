  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="#" class="brand-link">
      <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
      <span class="brand-text font-weight-light">Console</span>
    </a>
    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <li class="nav-item">
            <a href="/console/index.php" class="nav-link <?php if ($_SERVER['PHP_SELF'] === "/console/index.php") echo "active"; ?>">
              <i class="nav-icon fas fa-tachometer-alt"></i>
              <p>Home</p>
            </a>
          </li>
          <li class="nav-item">
            <a href="/console/categories.php" class="nav-link <?php if ($_SERVER['PHP_SELF'] === "/console/categories.php") echo "active"; ?>">
              <i class="nav-icon fas fa-th"></i>
              <p>Categories</p>
            </a>
          </li>
          <li class="nav-item">
            <a href="/console/tags.php" class="nav-link <?php if ($_SERVER['PHP_SELF'] === "/console/tags.php") echo "active"; ?>">
              <i class="nav-icon fas fa-th"></i>
              <p>Tags</p>
            </a>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">
              <?php if ($_SERVER['PHP_SELF'] === "/console/index.php") echo "Videos"; ?>
              <?php if ($_SERVER['PHP_SELF'] === "/console/categories.php") echo "Categories"; ?>
              <?php if ($_SERVER['PHP_SELF'] === "/console/tags.php") echo "Tags"; ?>
            </h1>
          </div><!-- /.col -->
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </section>
    <!-- Main content -->
    <section class="content">