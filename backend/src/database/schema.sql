CREATE TABLE IF NOT EXISTS users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NULL,

    google_id VARCHAR(255) NULL UNIQUE,

    role ENUM('customer', 'admin')
        NOT NULL DEFAULT 'customer',

    email_verified_at DATETIME NULL,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS email_otps (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    user_id INT UNSIGNED NOT NULL,

    otp_hash VARCHAR(255) NOT NULL,

    purpose ENUM(
        'registration',
        'forgot_password'
    ) NOT NULL,

    expires_at DATETIME NOT NULL,

    attempts TINYINT UNSIGNED NOT NULL DEFAULT 0,

    consumed_at DATETIME NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_email_otps_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    INDEX idx_email_otps_user_purpose (
        user_id,
        purpose,
        created_at
    ),

    INDEX idx_email_otps_expiry (expires_at)
);