Учебный проект
Курсовой проект
start
Finish
start
<IfModule mod_headers.c>
#    Header set Access-Control-Allow-Origin "*"
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-l
    RewriteRule ^(.+)$ /myserver/index.php [QSA,L]
</IfModule>



<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "*"
    Header set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
    Header set Access-Control-Allow-Headers "Content-Type, Authorization, X-Requested-With"
    Header set Access-Control-Max-Age "86400"
</IfModule>
