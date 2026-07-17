import type { Core } from '@strapi/strapi';

const programs = [
  { title: 'Water, Sanitation & Hygiene', slug: 'wash', summary: 'Professional site assessments and high-capacity boreholes provided free to communities that need safe, reliable water.', status: 'active', featured: true },
  { title: 'Church Planting & Enterprise', slug: 'church-planting', summary: 'Building churches as safe, multifunctional community centres and launching sustainable initiatives such as Goat Empowerment.', status: 'active', featured: true },
  { title: 'Children’s Charity & Education', slug: 'children-education', summary: 'Sponsorship, school fees, uniforms, scholastic materials, mentorship, spiritual guidance, and basic health support for vulnerable children.', status: 'active', featured: true },
  { title: 'Missions & Leadership', slug: 'missions-leadership', summary: 'Equipping pastors and village elders while taking the Gospel, counseling, food, and humanitarian aid to remote villages.', status: 'active', featured: true },
 ] as const;

const team = [
  { name: 'Ministry Leadership', slug: 'ministry-leadership', role: 'Leadership & partnerships', memberType: 'leadership', displayOrder: 1, active: true },
  { name: 'Field Operations', slug: 'field-operations', role: 'Water and infrastructure', memberType: 'staff', displayOrder: 2, active: true },
  { name: 'Community Programmes', slug: 'community-programmes', role: 'Education and care', memberType: 'staff', displayOrder: 3, active: true },
  { name: 'Mission Volunteers', slug: 'mission-volunteers', role: 'Outreach and service', memberType: 'volunteer', displayOrder: 4, active: true },
 ] as const;

const campaign = { title: 'Bright Futures Learning Centre', slug: 'bright-futures-learning-centre', summary: 'Help complete classrooms, a safe water point, learning materials, and teacher support for children in Wakiso.', goalAmount: 85000000, amountRaised: 61200000, currency: 'UGX', featured: true };

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const publicRole = await strapi.query('plugin::users-permissions.role').findOne({ where: { type: 'public' } });
    if (publicRole) {
      const publicActions = [
        'api::program.program.find',
        'api::program.program.findOne',
        'api::team-member.team-member.find',
        'api::team-member.team-member.findOne',
        'api::campaign.campaign.find', 'api::campaign.campaign.findOne',
        'api::event.event.find', 'api::event.event.findOne',
        'api::page.page.find', 'api::page.page.findOne',
        'api::partner.partner.find', 'api::partner.partner.findOne',
        'api::project.project.find', 'api::project.project.findOne',
        'api::report.report.find', 'api::report.report.findOne',
        'api::sermon.sermon.find', 'api::sermon.sermon.findOne',
        'api::story.story.find', 'api::story.story.findOne',
        'api::site-setting.site-setting.find',
      ];
      for (const action of publicActions) {
        let permission = await strapi.query('plugin::users-permissions.permission').findOne({ where: { action } });
        if (!permission) permission = await strapi.query('plugin::users-permissions.permission').create({ data: { action } });
        const linked = await strapi.db.connection('up_permissions_role_lnk').where({ permission_id: permission.id, role_id: publicRole.id }).first();
        if (!linked) await strapi.db.connection('up_permissions_role_lnk').insert({ permission_id: permission.id, role_id: publicRole.id, permission_ord: 1000 + permission.id });
      }
    }

    for (const program of programs) {
      const existing = await strapi.documents('api::program.program').findFirst({ filters: { slug: program.slug } });
      if (!existing) { const created = await strapi.documents('api::program.program').create({ data: program }); await strapi.documents('api::program.program').publish({ documentId: created.documentId }); } else if (!existing.publishedAt) await strapi.documents('api::program.program').publish({ documentId: existing.documentId });
    }

    for (const member of team) {
      const existing = await strapi.documents('api::team-member.team-member').findFirst({ filters: { slug: member.slug } });
      if (!existing) { const created = await strapi.documents('api::team-member.team-member').create({ data: member }); await strapi.documents('api::team-member.team-member').publish({ documentId: created.documentId }); } else if (!existing.publishedAt) await strapi.documents('api::team-member.team-member').publish({ documentId: existing.documentId });
    }

    const existingCampaign = await strapi.documents('api::campaign.campaign').findFirst({ filters: { slug: campaign.slug } });
    if (!existingCampaign) { const created = await strapi.documents('api::campaign.campaign').create({ data: campaign }); await strapi.documents('api::campaign.campaign').publish({ documentId: created.documentId }); }

    const siteSetting = await strapi.documents('api::site-setting.site-setting').findFirst();
    if (!siteSetting) { const created = await strapi.documents('api::site-setting.site-setting').create({ data: { organizationName: 'Kyagulanyi Ministries', tagline: 'Transforming lives, building communities, empowering the future.', mission: 'To render evangelism, community health programmes, clean water, education, and self-sustaining solutions that help communities end poverty.', vision: 'A Uganda where every person can access dignity, opportunity, safe water, and hope.', phone: '+256 701 234 567', address: 'Kampala, Uganda' } }); await strapi.documents('api::site-setting.site-setting').publish({ documentId: created.documentId }); }
  },
};
