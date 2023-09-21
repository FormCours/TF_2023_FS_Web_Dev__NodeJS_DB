USE DemoMessageServer;
GO

CREATE TABLE [Message] (
	[MessageId] UNIQUEIDENTIFIER DEFAULT NEWSEQUENTIALID(),
	[Pseudo] NVARCHAR(50) NOT NULL,
	[Content] NVARCHAR(2000) NOT NULL,
	[CreateDate] DATETIME2 DEFAULT GETDATE(),
	[Email] NVARCHAR(200) NULL
);

INSERT INTO [Message]([Pseudo], [Content], [Email])
 VALUES ('Della', 'Hello World', NULL),
		('Zaza', 'Coucou Emilie', 'zaza.vanderquack@technofututic.be');