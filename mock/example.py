"""
Example of mock server code for workbench

run python -m turq -p 7002

Navigate to http://localhost:7002/+turq/ and paste it in
"""
# Get all response sets
with path('/response-set/') as p:
    p.cors().json({
  "response_sets": [
    {
      "name": "Test Set with django pk 33 for series 2",
      "validation": True,
      "industry_ids": [
        2
      ],
      "client_ids": [],
      "objective_ids": [],
      "description": "A validation set",
      "id": "33",
      "series_ids": [
        2
      ],
      "response_set_uuid": "1693c0c5-c97c-4765-af0a-e9b30580c75d",
      "campaign_ids": [
        340
      ]
    },
    {
      "industry_ids": [
        2
      ],
      "responses": [
        {
          "from_email": "jmreigel@gmail.com",
          "raw_id": 11204748
        },
        {
          "from_email": "ddhopkin@gmail.com",
          "raw_id": 11925906
        },
        {
          "from_email": "2012carrasco@gmail.com",
          "raw_id": 13235748
        }
      ],
      "campaign_ids": [
        340,
        321
      ],
      "objective_ids": [
        4
      ],
      "id": "22",
      "validation": False,
      "description": "Training set for series 1, client 6789, campaigns 321 and 340, objective 4, industry 2",
      "client_ids": [
        6789
      ],
      "series_ids": [
        1
      ],
      "name": "Test Set with django pk 22",
      "response_set_uuid": "8af85449-03e8-4a44-8403-c4512906bb10"
    }
  ]
})

# Get a single response set
with path('/response-set/*/') as p:
    p.cors().json({
  "industry_ids": [
    2
  ],
  "responses": [
    {
      "from_email": "jmreigel@gmail.com",
      "raw_id": 11204748
    },
    {
      "from_email": "ddhopkin@gmail.com",
      "raw_id": 11925906
    },
    {
      "from_email": "2012carrasco@gmail.com",
      "raw_id": 13235748
    }
  ],
  "campaign_ids": [
    340,
    321
  ],
  "objective_ids": [
    4
  ],
  "id": "22",
  "validation": False,
  "description": "Training set for series 1, client 6789, campaigns 321 and 340, objective 4, industry 2",
  "client_ids": [
    6789
  ],
  "series_ids": [
    1
  ],
  "name": "Test Set with django pk 22",
  "response_set_uuid": "8af85449-03e8-4a44-8403-c4512906bb10"
})

# define /response/query/ path with dummy data
with path('/response/query/') as p:
    p.cors().json({
  "responses": [
    {
      "from_email": "2012carrasco@gmail.com",
      "raw_id": 13235748
    },
    {
      "from_email": "jmreigel@gmail.com",
      "raw_id": 11204748
    },
    {
      "from_email": "ddhopkin@gmail.com",
      "raw_id": 11925906
    },
    {
      "from_email": "frankmgiaramita@gmail.com",
      "raw_id": 12656253
    },
    {
      "from_email": "bwhite4sure@gmail.com",
      "raw_id": 11195982
    },
    {
      "from_email": "barney34@gmail.com",
      "raw_id": 12673939
    }
    ]
})
#define /config path
with path('/config/') as p:
    p.cors().json({
    "dependencies":[
      {"name":"anyjson","version":"0.3.3"},
      {"name":"djangorestframework","version":"3.3.3"},
      {"name":"python-dateutil","version":"2.5.3"},
      {"name":"flake8","version":"2.5.4"},
      {"name":"datadog","version":"0.12.0"},
      {"name":"py","version":"1.4.31"},
      {"name":"coverage","version":"4.1"},
      {"name":"django-filter","version":"0.13.0"},
      {"name":"simplejson","version":"3.8.2"},
      {"name":"pip","version":"8.1.2"},
      {"name":"pep8","version":"1.7.0"},
      {"name":"kombu","version":"3.0.35"},
      {"name":"boto","version":"2.40.0"},
      {"name":"boto3","version":"1.3.1"},
      {"name":"billiard","version":"3.3.0.23"},
      {"name":"celery","version":"3.1.23"},
      {"name":"six","version":"1.10.0"},
      {"name":"pyflakes","version":"1.0.0"},
      {"name":"pytest","version":"2.9.1"},
      {"name":"django-extensions","version":"1.6.7"},
      {"name":"gunicorn","version":"19.6.0"},
      {"name":"amqp","version":"1.4.9"},
      {"name":"Markdown","version":"2.6.6"},
      {"name":"django-rest","version":"0.0.1"},
      {"name":"jmespath","version":"0.9.0"},
      {"name":"structlog","version":"16.1.0"},
      {"name":"botocore","version":"1.4.35"},
      {"name":"Django","version":"1.9.6"},
      {"name":"mccabe","version":"0.4.0"},
      {"name":"pytest-cov","version":"2.3.0"},
      {"name":"decorator","version":"4.0.9"},
      {"name":"docutils","version":"0.12"},
      {"name":"pytz","version":"2016.4"},
      {"name":"pytest-django","version":"2.9.1"},
      {"name":"requests","version":"2.10.0"},
      {"name":"django-cors-headers","version":"1.1.0"},
      {"name":"setuptools","version":"18.2"}
    ],
    "django_version":"1.9.6",
    "debug":True,
    "commit":"5fc598737bc103ae56ef1dcc759629768f31452b",
    "python_version":"3.4.4 (default, Jun  9 2016, 15:19:02) \n[GCC 4.9.2]"
})
