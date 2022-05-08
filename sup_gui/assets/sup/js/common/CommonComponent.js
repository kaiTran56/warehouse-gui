let LeftPanel = '<aside id="left-panel" class="left-panel">'+
'<nav class="navbar navbar-expand-sm navbar-default">'+
    '<div id="main-menu" class="main-menu collapse navbar-collapse">'+
        '<ul class="nav navbar-nav">'+
            '<li class="active">'+
                '<a href="index.html"><i class="menu-icon fa fa-laptop"></i>Dashboard </a>'+
            '</li>'+
            '<li class="menu-title">UI elements</li><!-- /.menu-title -->'+
            '<li class="menu-item-has-children dropdown">'+
                '<a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-cogs"></i>Components</a>'+
                '<ul class="sub-menu children dropdown-menu">                            <li><i class="fa fa-puzzle-piece"></i><a href="ui-buttons.html">Buttons</a></li>'+
                    '<li><i class="fa fa-id-badge"></i><a href="ui-badges.html">Badges</a></li>'+
                    '<li><i class="fa fa-bars"></i><a href="ui-tabs.html">Tabs</a></li>'+
                    '<li><i class="fa fa-id-card-o"></i><a href="ui-cards.html">Cards</a></li>'+
                    '<li><i class="fa fa-exclamation-triangle"></i><a href="ui-alerts.html">Alerts</a></li>'+
                    '<li><i class="fa fa-spinner"></i><a href="ui-progressbar.html">Progress Bars</a></li>'+
                    '<li><i class="fa fa-fire"></i><a href="ui-modals.html">Modals</a></li>'+
                    '<li><i class="fa fa-book"></i><a href="ui-switches.html">Switches</a></li>'+
                    '<li><i class="fa fa-th"></i><a href="ui-grids.html">Grids</a></li>'+
                    '<li><i class="fa fa-file-word-o"></i><a href="ui-typgraphy.html">Typography</a></li>'+
                '</ul>'+
            '</li>'+
            '<li class="menu-item-has-children dropdown">'+
                '<a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-table"></i>Tables</a>'+
                '<ul class="sub-menu children dropdown-menu">'+
                    '<li><i class="fa fa-table"></i><a href="tables-basic.html">Basic Table</a></li>'+
                    '<li><i class="fa fa-table"></i><a href="tables-data.html">Data Table</a></li>'+
                '</ul>'+
            '</li>'+
            '<li class="menu-item-has-children dropdown">'+
                '<a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-th"></i>Forms</a>'+
                '<ul class="sub-menu children dropdown-menu">'+
                    '<li><i class="menu-icon fa fa-th"></i><a href="forms-basic.html">Basic Form</a></li>'+
                    '<li><i class="menu-icon fa fa-th"></i><a href="forms-advanced.html">Advanced Form</a></li>'+
                '</ul>'+
            '</li>'+
''+
            '<li class="menu-title">Icons</li><!-- /.menu-title -->'+
''+
            '<li class="menu-item-has-children dropdown">'+
                '<a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-tasks"></i>Icons</a>'+
                '<ul class="sub-menu children dropdown-menu">'+
                    '<li><i class="menu-icon fa fa-fort-awesome"></i><a href="font-fontawesome.html">Font Awesome</a></li>'+
                    '<li><i class="menu-icon ti-themify-logo"></i><a href="font-themify.html">Themefy Icons</a></li>'+
                '</ul>'+
            '</li>'+
            '<li class="menu-item-has-children dropdown">'+
                '<a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-bar-chart"></i>Charts</a>'+
                '<ul class="sub-menu children dropdown-menu">'+
                    '<li><i class="menu-icon fa fa-line-chart"></i><a href="charts-chartjs.html">Chart JS</a></li>'+
                    '<li><i class="menu-icon fa fa-area-chart"></i><a href="charts-flot.html">Flot Chart</a></li>'+
                    '<li><i class="menu-icon fa fa-pie-chart"></i><a href="charts-peity.html">Peity Chart</a></li>'+
                '</ul>'+
            '</li>'+
            '<li class="menu-title">Extras</li><!-- /.menu-title -->'+
            '<li class="menu-item-has-children dropdown">'+
                '<a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-glass"></i>Pages</a>'+
                '<ul class="sub-menu children dropdown-menu">'+
                    '<li><i class="menu-icon fa fa-sign-in"></i><a href="page-login.html">Login</a></li>'+
                    '<li><i class="menu-icon fa fa-sign-in"></i><a href="page-register.html">Register</a></li>'+
                    '<li><i class="menu-icon fa fa-paper-plane"></i><a href="pages-forget.html">Forget Pass</a></li>'+
                '</ul>'+
            '</li>'+
        '</ul>'+
    '</div><!-- /.navbar-collapse -->'+
'</nav>'+
'</aside>';

let Footer = '<footer class="site-footer">'+
'<div class="footer-inner bg-white">'+
    '<div class="row">'+
        '<div class="col-sm-6">'+
            'Copyright &copy; TranTran Ecosystem'+
        '</div>'+
        '<div class="col-sm-6 text-right">'+
            'Designed by <a>TranQuyet</a>'+
        '</div>'+
    '</div>'+
'</div>'
+'</footer>';

let Header = '     <div class=\"top-left\">'
+ '                <div class=\"navbar-header\">'
+ '                    <a class=\"navbar-brand\" href=\"./\"><img src=\"images/logo.png\" alt=\"Logo\"></a>'
+ '                    <a class=\"navbar-brand hidden\" href=\"./\"><img src=\"images/logo2.png\" alt=\"Logo\"></a>'
+ '                    <a id=\"menuToggle\" class=\"menutoggle\"><i class=\"fa fa-bars\"></i></a>'
+ '                </div>'
+ '            </div>'
+ '            <div class=\"top-right\">'
+ '                <div class=\"header-menu\">'
+ '                    <div class=\"header-left\">'
+ '                        <button class=\"search-trigger\"><i class=\"fa fa-search\"></i></button>'
+ '                        <div class=\"form-inline\">'
+ '                            <form class=\"search-form\">'
+ '                                <input class=\"form-control mr-sm-2\" type=\"text\" placeholder=\"Search ...\" aria-label=\"Search\">'
+ '                                <button class=\"search-close\" type=\"submit\"><i class=\"fa fa-close\"></i></button>'
+ '                            </form>'
+ '                        </div>'
+ ''
+ '                        <div class=\"dropdown for-notification\">'
+ '                            <button class=\"btn btn-secondary dropdown-toggle\" type=\"button\" id=\"notification\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">'
+ '                                <i class=\"fa fa-bell\"></i>'
+ '                                <span class=\"count bg-danger\">3</span>'
+ '                            </button>'
+ '                            <div class=\"dropdown-menu\" aria-labelledby=\"notification\">'
+ '                                <p class=\"red\">You have 3 Notification</p>'
+ '                                <a class=\"dropdown-item media\" href=\"#\">'
+ '                                    <i class=\"fa fa-check\"></i>'
+ '                                    <p>Server #1 overloaded.</p>'
+ '                                </a>'
+ '                                <a class=\"dropdown-item media\" href=\"#\">'
+ '                                    <i class=\"fa fa-info\"></i>'
+ '                                    <p>Server #2 overloaded.</p>'
+ '                                </a>'
+ '                                <a class=\"dropdown-item media\" href=\"#\">'
+ '                                    <i class=\"fa fa-warning\"></i>'
+ '                                    <p>Server #3 overloaded.</p>'
+ '                                </a>'
+ '                            </div>'
+ '                        </div>'
+ '                    </div>'
+ ''
+ '                    <div class=\"user-area dropdown float-right\">'
+ '                        <a href=\"#\" class=\"dropdown-toggle active\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">'
+ '                            <img class=\"user-avatar rounded-circle\" src=\"https://media.vov.vn/sites/default/files/styles/large/public/2021-01/d5_khyjueaavq7h_1.jpg\" alt=\"User Avatar\">'
+ '                        </a>'
+ '                        <div class=\"user-menu dropdown-menu\">'
+ '                            <a class=\"nav-link\" href=\"#\"><i class=\"fa fa- user\"></i>My Profile</a>'
+ ''
+ '                            <a class=\"nav-link\" href=\"#\"><i class=\"fa fa- user\"></i>Notifications <span class=\"count\">13</span></a>'
+ ''
+ '                            <a class=\"nav-link\" href=\"#\"><i class=\"fa fa -cog\"></i>Settings</a>'
+ ''
+ '                            <a class=\"nav-link\" href=\"#\"><i class=\"fa fa-power -off\"></i>Logout</a>'
+ '                        </div>'
+ '                    </div>'
+ ''
+ '                </div>'
+ '            </div>';