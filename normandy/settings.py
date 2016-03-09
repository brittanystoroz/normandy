import os

from configurations import Configuration, values


class Core(Configuration):
    """Settings that will never change per-environment."""
    # Build paths inside the project like this: os.path.join(BASE_DIR, ...)
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    # Application definition
    INSTALLED_APPS = [
        'normandy.base',
        'normandy.classifier',
        'normandy.health.apps.HealthApp',
        'normandy.recipes',
        'normandy.selfrepair',

        'adminplus',
        'adminsortable',
        'product_details',
        'rest_framework',
        'rest_framework.authtoken',
        'storages',
        'raven.contrib.django.raven_compat',

        'django.contrib.admin.apps.SimpleAdminConfig',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
    ]

    MIDDLEWARE_CLASSES = [
        'normandy.classifier.middleware.RequestReceivedAtMiddleware',
        'normandy.base.middleware.ShortCircuitMiddleware',

        'django.middleware.security.SecurityMiddleware',
        'django.contrib.sessions.middleware.SessionMiddleware',
        'django.middleware.common.CommonMiddleware',
        'django.middleware.csrf.CsrfViewMiddleware',
        'django.contrib.auth.middleware.AuthenticationMiddleware',
        'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
        'django.contrib.messages.middleware.MessageMiddleware',
        'django.middleware.clickjacking.XFrameOptionsMiddleware',
    ]

    ROOT_URLCONF = 'normandy.urls'

    TEMPLATES = [
        {
            'BACKEND': 'django.template.backends.django.DjangoTemplates',
            'DIRS': [],
            'APP_DIRS': True,
            'OPTIONS': {
                'context_processors': [
                    'django.template.context_processors.debug',
                    'django.template.context_processors.request',
                    'django.contrib.auth.context_processors.auth',
                    'django.contrib.messages.context_processors.messages',
                    'django.core.context_processors.static',
                ],
            },
        },
    ]

    WSGI_APPLICATION = 'normandy.wsgi.application'

    # Internationalization
    LANGUAGE_CODE = 'en-us'
    TIME_ZONE = 'UTC'
    USE_I18N = False
    USE_L10N = False
    USE_TZ = True

    # Static files (CSS, JavaScript, Images)
    STATIC_URL = '/static/'
    STATIC_ROOT = os.path.join(BASE_DIR, 'static')

    # User-uploaded Media
    MEDIA_URL = '/media/'
    MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

    REST_FRAMEWORK = {
        'DEFAULT_AUTHENTICATION_CLASSES': (
            'rest_framework.authentication.TokenAuthentication',
            'rest_framework.authentication.SessionAuthentication'
        ),
        'TEST_REQUEST_DEFAULT_FORMAT': 'json',
    }



class Base(Core):
    """Settings that may change per-environment, some with defaults."""
    # General settings
    DEBUG = values.BooleanValue(False)
    ADMINS = values.SingleNestedListValue([])

    # Remote services
    DATABASES = values.DatabaseURLValue('postgres://postgres@localhost/normandy')
    GEOIP2_DATABASE = values.Value(os.path.join(Core.BASE_DIR, 'GeoLite2-Country.mmdb'))
    # Email settings
    EMAIL_HOST_USER = values.Value()
    EMAIL_HOST = values.Value()
    EMAIL_PORT = values.IntegerValue(587)
    EMAIL_USE_TLS = values.BooleanValue(True)
    EMAIL_HOST_PASSWORD = values.Value()
    EMAIL_BACKEND = values.Value('django.core.mail.backends.smtp.EmailBackend')
    RAVEN_CONFIG = {
        'dsn': values.URLValue(None, environ_name='RAVEN_CONFIG_DSN'),
    }
    PROD_DETAILS_STORAGE = values.Value('normandy.recipes.storage.ProductDetailsRelationalStorage')
    # statsd
    STATSD_HOST = values.Value('localhost')
    STATSD_PORT = values.IntegerValue(8125)
    STATSD_IPV6 = values.BooleanValue(False)
    STATSD_PREFIX = values.Value(None)
    STATSD_MAXUDPSIZE = values.IntegerValue(512)

    # Security settings
    SECRET_KEY = values.SecretValue()
    ALLOWED_HOSTS = values.ListValue([])
    AUTH_PASSWORD_VALIDATORS = [
        {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
        {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
        {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
        {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
    ]
    USE_X_FORWARDED_HOST = values.BooleanValue(False)
    SECURE_PROXY_SSL_HEADER = values.TupleValue()
    SECURE_HSTS_SECONDS = values.IntegerValue(3600)
    SECURE_HSTS_INCLUDE_SUBDOMAINS = values.BooleanValue(True)
    CSRF_COOKIE_HTTPONLY = values.BooleanValue(True)
    CSRF_COOKIE_SECURE = values.BooleanValue(True)
    SECURE_SSL_REDIRECT = values.BooleanValue(True)
    SECURE_REDIRECT_EXEMPT = values.ListValue([])
    SESSION_COOKIE_SECURE = values.BooleanValue(True)
    SECURE_BROWSER_XSS_FILTER = values.BooleanValue(True)
    SECURE_CONTENT_TYPE_NOSNIFF = values.BooleanValue(True)
    X_FRAME_OPTIONS = values.Value('DENY')

    # Media and static settings
    STATICFILES_STORAGE = values.Value('whitenoise.django.GzipManifestStaticFilesStorage')
    # Overwrite old files when uploading media.
    DEFAULT_FILE_STORAGE = values.Value('storages.backends.overwrite.OverwriteStorage')

    # Normandy settings
    CAN_EDIT_ACTIONS_IN_USE = values.BooleanValue(False)
    ADMIN_ENABLED = values.BooleanValue(True)


class Development(Base):
    """Settings for local development."""
    DOTENV_EXISTS = os.path.exists(os.path.join(Core.BASE_DIR, '.env'))
    DOTENV = '.env' if DOTENV_EXISTS else None

    SECRET_KEY = values.Value('not a secret')
    DEBUG = values.BooleanValue(True)
    AUTH_PASSWORD_VALIDATORS = values.ListValue([])
    INSTALLED_APPS = Base.INSTALLED_APPS + ['sslserver']
    EMAIL_BACKEND = values.Value('django.core.mail.backends.console.EmailBackend')
    SECURE_SSL_REDIRECT = values.Value(False)

    CAN_EDIT_ACTIONS_IN_USE = values.BooleanValue(True)


class Production(Base):
    """Settings for the production environment."""
    USE_X_FORWARDED_HOST = values.BooleanValue(True)
    SECURE_PROXY_SSL_HEADER = values.TupleValue(('HTTP_X_FORWARDED_PROTO', 'https'))


class Build(Production):
    """Settings for building the Docker image for production."""
    SECRET_KEY = values.Value('not a secret')


class Test(Base):
    SECRET_KEY = values.Value('not a secret')
    DEFAULT_FILE_STORAGE = 'inmemorystorage.InMemoryStorage'
    SECURE_SSL_REDIRECT = values.BooleanValue(False)
    STATICFILES_STORAGE = values.Value('django.contrib.staticfiles.storage.StaticFilesStorage')
