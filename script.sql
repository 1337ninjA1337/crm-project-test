USE [contactsdb]
GO
/****** Object:  Table [dbo].[contacts]    Script Date: 18.09.2022 21:35:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[contacts](
	[ContactId] [int] IDENTITY(1,1) NOT NULL,
	[ContactName] [varchar](500) NULL,
	[MobilePhone] [varchar](500) NULL,
	[JobTitle] [varchar](500) NULL,
	[BirthDate] [date] NULL
) ON [PRIMARY]
GO
