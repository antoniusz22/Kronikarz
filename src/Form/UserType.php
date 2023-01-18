<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TelType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('firstName')
            ->add('lastName')
//            ->add('email', EmailType::class)
//            ->add('telephone', TelType::class)
            ->add('birthday', DateType::class, [
                'widget' => 'single_text',
            ])
            ->add('death', DateType::class, [
                'widget' => 'single_text',
                'required' => false,
            ])
            ->add('birthplace')
            ->add('country_of_birth')
            ->add('sex')
            ->add('profession')
            ->add('additional_information')
            ->add('Submit', SubmitType::class);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
            'csrf_protection' => true,
            'csrf_field_name' => '_token',
            'csrf_token_id' => 'user_item'
        ]);
    }
}
