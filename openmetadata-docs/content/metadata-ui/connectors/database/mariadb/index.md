---
title: MariaDB
slug: /metadata-ui/connectors/database/mariadb
---

<ConnectorIntro connector="MariaDB" hasProfiler="true" hasDBT="true" />

<Requirements />

<MetadataIngestionService connector="MariaDB"/>

<h4>Connection Options</h4>

- **Username**: Specify the User to connect to MariaDB. It should have enough privileges to read all the metadata.
- **Password**: Password to connect to MariaDB.
- **Host and Port**: Enter the fully qualified hostname and port number for your MariaDB deployment in the Host and Port field.
- **Connection Options (Optional)**: Enter the details for any additional connection options that can be sent to MariaDB during the connection. These details must be added as Key-Value pairs.
- **Connection Arguments (Optional)**: Enter the details for any additional connection arguments such as security or protocol configs that can be sent to MariaDB during the connection. These details must be added as Key-Value pairs. 
  - In case you are using Single-Sign-On (SSO) for authentication, add the `authenticator` details in the Connection Arguments as a Key-Value pair as follows: `"authenticator" : "sso_login_url"`
  - In case you authenticate with SSO using an external browser popup, then add the `authenticator` details in the Connection Arguments as a Key-Value pair as follows: `"authenticator" : "externalbrowser"`

<IngestionScheduleAndDeploy />

<ConnectorOutro connector="MariaDB" hasProfiler="true" hasDBT="true" />
