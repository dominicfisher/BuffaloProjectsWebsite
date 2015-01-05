exports.fetchContacts = function (req, res) {
	res.writeHead(200, {"Content-Type": "application/json"});
	var summaryItems =
		[
			{
				"profileId" 	: "1234",
				"smallImagePath"		: "https://s3-us-west-2.amazonaws.com/buffaloprofileimages/grid/shane.png",
				"largeImagePath" 		: "https://s3-us-west-2.amazonaws.com/buffaloprofileimages/profiledetail/shane.png",
				"searchImagePath"			: [],
				"sex" 		: "Male",
				"nameHistories"	:[
					{
						"startDate"		:	new Date().getTime()/1000,
						"endDate"		:	0,
						"firstName"		:	"Shane",
						"middleName"	:	"",
						"middle2Name"	:	"",
						"lastName"		:	"Landry",
						"suffix"		:	""
					},
					],
				"addressHistories"	:	[],
				"emailAccountHistories"		:	[],
				"instantMessengerAccountHistories"	:	[],
				"phoneNumberHistories"				:	[],
				"calendarAccountHistories"			:	[],
				"facebookAccountHistories"			:	[],
				"googlePlusAccountHistories"		:	[],
				"linkedInAccountHistories"			:	[],
				"boxAccountHistories"				:	[],
				"dropboxAccountHistories"			:	[],
				
				},
				
				{
					"profileId" 	: "1234",
					"smallImagePath"		: "https://s3-us-west-2.amazonaws.com/buffaloprofileimages/grid/adrienne.png",
					"largeImagePath" 		: "https://s3-us-west-2.amazonaws.com/buffaloprofileimages/profiledetail/adrienne.png",
					"searchImagePath"			: [],
					"sex" 		: "Female",
					"nameHistories"	:[
						{
							"startDate"		:	new Date().getTime()/1000,
							"endDate"		:	0,
							"firstName"		:	"Adrienne",
							"middleName"	:	"Hill",
							"middle2Name"	:	"",
							"lastName"		:	"Fisher",
							"suffix"		:	""
						},
						],
					"addressHistories"	:	[],
					"emailAccountHistories"		:	[],
					"instantMessengerAccountHistories"	:	[],
					"phoneNumberHistories"				:	[],
					"calendarAccountHistories"			:	[],
					"facebookAccountHistories"			:	[],
					"googlePlusAccountHistories"		:	[],
					"linkedInAccountHistories"			:	[],
					"boxAccountHistories"				:	[],
					"dropboxAccountHistories"			:	[],
					
					},
					
					{
						"profileId" 	: "1234",
						"smallImagePath"		: "https://s3-us-west-2.amazonaws.com/buffaloprofileimages/grid/claire.png",
						"largeImagePath" 		: "https://s3-us-west-2.amazonaws.com/buffaloprofileimages/profiledetail/claire.png",
						"searchImagePath"			: [],
						"sex" 		: "Female",
						"nameHistories"	:[
							{
								"startDate"		:	new Date().getTime()/1000,
								"endDate"		:	0,
								"firstName"		:	"Cunningham",
								"middleName"	:	"",
								"middle2Name"	:	"",
								"lastName"		:	"Claire",
								"suffix"		:	""
							},
							],
						"addressHistories"	:	[],
						"emailAccountHistories"		:	[],
						"instantMessengerAccountHistories"	:	[],
						"phoneNumberHistories"				:	[],
						"calendarAccountHistories"			:	[],
						"facebookAccountHistories"			:	[],
						"googlePlusAccountHistories"		:	[],
						"linkedInAccountHistories"			:	[],
						"boxAccountHistories"				:	[],
						"dropboxAccountHistories"			:	[],
						
						},
						
						{
							"profileId" 	: "1234",
							"smallImagePath"		: "https://s3-us-west-2.amazonaws.com/buffaloprofileimages/grid/darrell.png",
							"largeImagePath" 		: "https://s3-us-west-2.amazonaws.com/buffaloprofileimages/profiledetail/darrell.png",
							"searchImagePath"			: [],
							"sex" 		: "Male",
							"nameHistories"	:[
								{
									"startDate"		:	new Date().getTime()/1000,
									"endDate"		:	0,
									"firstName"		:	"Darrell",
									"middleName"	:	"",
									"middle2Name"	:	"",
									"lastName"		:	"Simmen",
									"suffix"		:	"Jr."
								},
								],
							"addressHistories"	:	[],
							"emailAccountHistories"		:	[],
							"instantMessengerAccountHistories"	:	[],
							"phoneNumberHistories"				:	[],
							"calendarAccountHistories"			:	[],
							"facebookAccountHistories"			:	[],
							"googlePlusAccountHistories"		:	[],
							"linkedInAccountHistories"			:	[],
							"boxAccountHistories"				:	[],
							"dropboxAccountHistories"			:	[],
							
							},
							
							{
								"profileId" 	: "1234",
								"smallImagePath"		: "https://s3-us-west-2.amazonaws.com/buffaloprofileimages/grid/kelley.png",
								"largeImagePath" 		: "https://s3-us-west-2.amazonaws.com/buffaloprofileimages/profiledetail/kelley.png",
								"searchImagePath"			: [],
								"sex" 		: "Female",
								"nameHistories"	:[
									{
										"startDate"		:	new Date().getTime()/1000,
										"endDate"		:	0,
										"firstName"		:	"Kelley",
										"middleName"	:	"Bowers",
										"middle2Name"	:	"",
										"lastName"		:	"Bogden",
										"suffix"		:	""
									},
									],
								"addressHistories"	:	[],
								"emailAccountHistories"		:	[],
								"instantMessengerAccountHistories"	:	[],
								"phoneNumberHistories"				:	[],
								"calendarAccountHistories"			:	[],
								"facebookAccountHistories"			:	[],
								"googlePlusAccountHistories"		:	[],
								"linkedInAccountHistories"			:	[],
								"boxAccountHistories"				:	[],
								"dropboxAccountHistories"			:	[],
								
								},
								
								{
									"profileId" 	: "1234",
									"smallImagePath"		: "https://s3-us-west-2.amazonaws.com/buffaloprofileimages/grid/maddie.png",
									"largeImagePath" 		: "https://s3-us-west-2.amazonaws.com/buffaloprofileimages/profiledetail/maddie.png",
									"searchImagePath"			: [],
									"sex" 		: "Female",
									"nameHistories"	:[
										{
											"startDate"		:	new Date().getTime()/1000,
											"endDate"		:	0,
											"firstName"		:	"Madaline",
											"middleName"	:	"",
											"middle2Name"	:	"",
											"lastName"		:	"Hill",
											"suffix"		:	""
										},
										],
									"addressHistories"	:	[],
									"emailAccountHistories"		:	[],
									"instantMessengerAccountHistories"	:	[],
									"phoneNumberHistories"				:	[],
									"calendarAccountHistories"			:	[],
									"facebookAccountHistories"			:	[],
									"googlePlusAccountHistories"		:	[],
									"linkedInAccountHistories"			:	[],
									"boxAccountHistories"				:	[],
									"dropboxAccountHistories"			:	[],
									
									},
									{
										"profileId" 	: "1234",
										"smallImagePath"		: "https://s3-us-west-2.amazonaws.com/buffaloprofileimages/grid/allison.png",
										"largeImagePath" 		: "https://s3-us-west-2.amazonaws.com/buffaloprofileimages/profiledetail/allison.png",
										"searchImagePath"			: [],
										"sex" 		: "Female",
										"nameHistories"	:[
											{
												"startDate"		:	new Date().getTime()/1000,
												"endDate"		:	0,
												"firstName"		:	"Allison",
												"middleName"	:	"",
												"middle2Name"	:	"",
												"lastName"		:	"DiMartino",
												"suffix"		:	""
											},
											],
										"addressHistories"	:	[],
										"emailAccountHistories"		:	[],
										"instantMessengerAccountHistories"	:	[],
										"phoneNumberHistories"				:	[],
										"calendarAccountHistories"			:	[],
										"facebookAccountHistories"			:	[],
										"googlePlusAccountHistories"		:	[],
										"linkedInAccountHistories"			:	[],
										"boxAccountHistories"				:	[],
										"dropboxAccountHistories"			:	[],
										
										},
										{
											"profileId" 	: "1234",
											"smallImagePath"		: "https://s3-us-west-2.amazonaws.com/buffaloprofileimages/grid/matt.png",
											"largeImagePath" 		: "https://s3-us-west-2.amazonaws.com/buffaloprofileimages/profiledetail/matt.png",
											"searchImagePath"			: [],
											"sex" 		: "Male",
											"nameHistories"	:[
												{
													"startDate"		:	new Date().getTime()/1000,
													"endDate"		:	0,
													"firstName"		:	"Matt",
													"middleName"	:	"",
													"middle2Name"	:	"",
													"lastName"		:	"Smith",
													"suffix"		:	""
												},
												],
											"addressHistories"	:	[],
											"emailAccountHistories"		:	[],
											"instantMessengerAccountHistories"	:	[],
											"phoneNumberHistories"				:	[],
											"calendarAccountHistories"			:	[],
											"facebookAccountHistories"			:	[],
											"googlePlusAccountHistories"		:	[],
											"linkedInAccountHistories"			:	[],
											"boxAccountHistories"				:	[],
											"dropboxAccountHistories"			:	[],
											
											},
											
											{
												"profileId" 	: "1234",
												"smallImagePath"		: "https://s3-us-west-2.amazonaws.com/buffaloprofileimages/grid/leslie.png",
												"largeImagePath" 		: "https://s3-us-west-2.amazonaws.com/buffaloprofileimages/profiledetail/leslie.png",
												"searchImagePath"			: [],
												"sex" 		: "Female",
												"nameHistories"	:[
													{
														"startDate"		:	new Date().getTime()/1000,
														"endDate"		:	0,
														"firstName"		:	"Leslie",
														"middleName"	:	"",
														"middle2Name"	:	"",
														"lastName"		:	"Simmien",
														"suffix"		:	""
													},
													],
												"addressHistories"	:	[],
												"emailAccountHistories"		:	[],
												"instantMessengerAccountHistories"	:	[],
												"phoneNumberHistories"				:	[],
												"calendarAccountHistories"			:	[],
												"facebookAccountHistories"			:	[],
												"googlePlusAccountHistories"		:	[],
												"linkedInAccountHistories"			:	[],
												"boxAccountHistories"				:	[],
												"dropboxAccountHistories"			:	[],
												
												},
												
												{
													"profileId" 	: "1234",
													"smallImagePath"		: "https://s3-us-west-2.amazonaws.com/buffaloprofileimages/grid/watkins.png",
													"largeImagePath" 		: "https://s3-us-west-2.amazonaws.com/buffaloprofileimages/profiledetail/justin.png",
													"searchImagePath"			: [],
													"sex" 		: "Male",
													"nameHistories"	:[
														{
															"startDate"		:	new Date().getTime()/1000,
															"endDate"		:	0,
															"firstName"		:	"Watkins",
															"middleName"	:	"",
															"middle2Name"	:	"",
															"lastName"		:	"Justin",
															"suffix"		:	""
														},
														],
													"addressHistories"	:	[],
													"emailAccountHistories"		:	[],
													"instantMessengerAccountHistories"	:	[],
													"phoneNumberHistories"				:	[],
													"calendarAccountHistories"			:	[],
													"facebookAccountHistories"			:	[],
													"googlePlusAccountHistories"		:	[],
													"linkedInAccountHistories"			:	[],
													"boxAccountHistories"				:	[],
													"dropboxAccountHistories"			:	[],
													
													},
													
													{
														"profileId" 	: "1234",
														"smallImagePath"		: "https://s3-us-west-2.amazonaws.com/buffaloprofileimages/grid/jessica.png",
														"largeImagePath" 		: "https://s3-us-west-2.amazonaws.com/buffaloprofileimages/profiledetail/jessica.png",
														"searchImagePath"			: [],
														"sex" 		: "Female",
														"nameHistories"	:[
															{
																"startDate"		:	new Date().getTime()/1000,
																"endDate"		:	0,
																"firstName"		:	"Jessica",
																"middleName"	:	"",
																"middle2Name"	:	"",
																"lastName"		:	"Cox",
																"suffix"		:	""
															},
															],
														"addressHistories"	:	[],
														"emailAccountHistories"		:	[],
														"instantMessengerAccountHistories"	:	[],
														"phoneNumberHistories"				:	[],
														"calendarAccountHistories"			:	[],
														"facebookAccountHistories"			:	[],
														"googlePlusAccountHistories"		:	[],
														"linkedInAccountHistories"			:	[],
														"boxAccountHistories"				:	[],
														"dropboxAccountHistories"			:	[],
														
														},
														
														{
															"profileId" 	: "1234",
															"smallImagePath"		: "https://s3-us-west-2.amazonaws.com/buffaloprofileimages/grid/paul.png",
															"largeImagePath" 		: "https://s3-us-west-2.amazonaws.com/buffaloprofileimages/profiledetail/paul.png",
															"searchImagePath"			: [],
															"sex" 		: "Male",
															"nameHistories"	:[
																{
																	"startDate"		:	new Date().getTime()/1000,
																	"endDate"		:	0,
																	"firstName"		:	"Paul",
																	"middleName"	:	"",
																	"middle2Name"	:	"",
																	"lastName"		:	"Gordon",
																	"suffix"		:	""
																},
																],
															"addressHistories"	:	[],
															"emailAccountHistories"		:	[],
															"instantMessengerAccountHistories"	:	[],
															"phoneNumberHistories"				:	[],
															"calendarAccountHistories"			:	[],
															"facebookAccountHistories"			:	[],
															"googlePlusAccountHistories"		:	[],
															"linkedInAccountHistories"			:	[],
															"boxAccountHistories"				:	[],
															"dropboxAccountHistories"			:	[],
															
															},
															
															{
																"profileId" 	: "1234",
																"smallImagePath"		: "https://s3-us-west-2.amazonaws.com/buffaloprofileimages/grid/zach.png",
																"largeImagePath" 		: "https://s3-us-west-2.amazonaws.com/buffaloprofileimages/profiledetail/zach.png",
																"searchImagePath"			: [],
																"sex" 		: "Male",
																"nameHistories"	:[
																	{
																		"startDate"		:	new Date().getTime()/1000,
																		"endDate"		:	0,
																		"firstName"		:	"Zach",
																		"middleName"	:	"",
																		"middle2Name"	:	"",
																		"lastName"		:	"Frank",
																		"suffix"		:	""
																	},
																	],
																"addressHistories"	:	[],
																"emailAccountHistories"		:	[],
																"instantMessengerAccountHistories"	:	[],
																"phoneNumberHistories"				:	[],
																"calendarAccountHistories"			:	[],
																"facebookAccountHistories"			:	[],
																"googlePlusAccountHistories"		:	[],
																"linkedInAccountHistories"			:	[],
																"boxAccountHistories"				:	[],
																"dropboxAccountHistories"			:	[],
																
																},
																
																{
																	"profileId" 	: "1234",
																	"smallImagePath"		: "https://s3-us-west-2.amazonaws.com/buffaloprofileimages/grid/jt.png",
																	"largeImagePath" 		: "https://s3-us-west-2.amazonaws.com/buffaloprofileimages/profiledetail/jt.png",
																	"searchImagePath"			: [],
																	"sex" 		: "Male",
																	"nameHistories"	:[
																		{
																			"startDate"		:	new Date().getTime()/1000,
																			"endDate"		:	0,
																			"firstName"		:	"JT",
																			"middleName"	:	"",
																			"middle2Name"	:	"",
																			"lastName"		:	"Tenjack",
																			"suffix"		:	""
																		},
																		],
																	"addressHistories"	:	[],
																	"emailAccountHistories"		:	[],
																	"instantMessengerAccountHistories"	:	[],
																	"phoneNumberHistories"				:	[],
																	"calendarAccountHistories"			:	[],
																	"facebookAccountHistories"			:	[],
																	"googlePlusAccountHistories"		:	[],
																	"linkedInAccountHistories"			:	[],
																	"boxAccountHistories"				:	[],
																	"dropboxAccountHistories"			:	[],
																	
																	},
																	{
																		"profileId" 	: "1234",
																		"smallImagePath"		: "https://s3-us-west-2.amazonaws.com/buffaloprofileimages/grid/lindsey.png",
																		"largeImagePath" 		: "https://s3-us-west-2.amazonaws.com/buffaloprofileimages/profiledetail/lindsey.png",
																		"searchImagePath"			: [],
																		"sex" 		: "Female",
																		"nameHistories"	:[
																			{
																				"startDate"		:	new Date().getTime()/1000,
																				"endDate"		:	0,
																				"firstName"		:	"Lindsey",
																				"middleName"	:	"Patterson",
																				"middle2Name"	:	"",
																				"lastName"		:	"Smith",
																				"suffix"		:	""
																			},
																			],
																		"addressHistories"	:	[],
																		"emailAccountHistories"		:	[],
																		"instantMessengerAccountHistories"	:	[],
																		"phoneNumberHistories"				:	[],
																		"calendarAccountHistories"			:	[],
																		"facebookAccountHistories"			:	[],
																		"googlePlusAccountHistories"		:	[],
																		"linkedInAccountHistories"			:	[],
																		"boxAccountHistories"				:	[],
																		"dropboxAccountHistories"			:	[],
																		
																		},
																		
																		{
																			"profileId" 	: "1234",
																			"smallImagePath"		: "https://s3-us-west-2.amazonaws.com/buffaloprofileimages/grid/megan.png",
																			"largeImagePath" 		: "https://s3-us-west-2.amazonaws.com/buffaloprofileimages/profiledetail/megan.png",
																			"searchImagePath"			: [],
																			"sex" 		: "Female",
																			"nameHistories"	:[
																				{
																					"startDate"		:	new Date().getTime()/1000,
																					"endDate"		:	0,
																					"firstName"		:	"Megan",
																					"middleName"	:	"",
																					"middle2Name"	:	"",
																					"lastName"		:	"Voepel",
																					"suffix"		:	""
																				},
																				],
																			"addressHistories"	:	[],
																			"emailAccountHistories"		:	[],
																			"instantMessengerAccountHistories"	:	[],
																			"phoneNumberHistories"				:	[],
																			"calendarAccountHistories"			:	[],
																			"facebookAccountHistories"			:	[],
																			"googlePlusAccountHistories"		:	[],
																			"linkedInAccountHistories"			:	[],
																			"boxAccountHistories"				:	[],
																			"dropboxAccountHistories"			:	[],
																			
																			},
			
			
			]
	
	var output = {summaryItems:summaryItems};
	res.end(JSON.stringify(output) + "\n");
};

exports.fetchTopFriends = function(req, res) {
	
};

exports.fetchRecentFriends = function(req, res) {
	
};

exports.fetchTopColleagues = function(req, res) {
	
};

exports.fetchRecentColleagues = function(req, res) {
	
};

exports.addContact = function(req, res) {
	
};

exports.updateContact = function(req, res) {
	
};

exports.deleteContact = function(req, res) {
	
};