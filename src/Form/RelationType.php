<?php

namespace App\Form;

use App\Entity\Relation;
use App\Entity\User;
use Doctrine\Common\Collections\Selectable;
use Doctrine\ORM\EntityRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class RelationType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('parent', EntityType::class, [
                'class' => User::class,
                'choice_label' => function (User $user) {
                    return $user->getFirstName() . " " . $user->getLastName();
                },
                'choice_value' => 'id',
                'multiple' => false,
            ])
            ->add('child', EntityType::class, [
                'class' => User::class,
                'choice_label' => function (User $user) {
                    return $user->getFirstName() . " " . $user->getLastName();
                },
                'choice_value' => 'id',
                'multiple' => false,
            ])
            ->add('relationship_type', ChoiceType::class, [
                'choices'  => [
                    'Małżeństwo' => 0,
                    'Dziecko' => 1,
                    'Dalsza rodzina' => 2,
                ],
            ])
            ->add('wedding_date', DateType::class, [
                'widget' => 'single_text',
                'required' => false,
            ])
            ->add('Submit', SubmitType::class);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Relation::class,
            'csrf_protection' => true,
            'csrf_field_name' => '_token',
            'csrf_token_id' => 'user_item'
        ]);
    }
}
