# gro
Exercise for Gro-Intelligence

Setup
=======
* clone repository
* setup a Virtual Host server
* open browser and navigate to configured virtual host

# Sample Virtual Host Settings
```
<VirtualHost *:80>
    ServerName grow.local
    DocumentRoot "/Users/sylvan/www/gro"
    ErrorLog "/private/var/log/apache2/gro-error_log"
    CustomLog "/private/var/log/apache2/gro-accesss_log" common

    <Directory "/Users/sylvan/www/gro">
        Options All
        AllowOverride All
        Require all granted
    </Directory>

    <IfModule dir_module>
        DirectoryIndex index.html
    </IfModule>
</VirtualHost>
```